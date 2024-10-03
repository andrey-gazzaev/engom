import { inject, Injectable } from '@angular/core';
import { first, ignoreElements, map, merge, Observable, of, OperatorFunction, pipe, shareReplay, switchMap } from 'rxjs';

import { Login } from '../models/login';
import { PasswordReset } from '../models/password-reset';
import { User } from '../models/user';
import { UserSecret } from '../models/user-secret';

import { AuthApiService } from './auth-api.service';
import { UserSecretStorageService } from './user-secret-storage.service';
import { UserApiService } from './user-api.service';

/**
 * Stateful service for storing/managing information about the current user.
 */
@Injectable({
	providedIn: 'root',
})
export class UserService {

	/** Current user. `null` when a user is not logged in. */
	public readonly currentUser$: Observable<User | null>;

	/** Whether the current user is authorized. */
	public readonly isAuthorized$: Observable<boolean>;

	private readonly authService = inject(AuthApiService);

	private readonly userSecretStorage = inject(UserSecretStorageService);

	private readonly userApiService = inject(UserApiService);

	public constructor() {
		this.currentUser$ = this.initCurrentUserStream();
		this.isAuthorized$ = this.currentUser$.pipe(map(user => user != null));
	}

	/**
	 * Login a user with email and password.
	 * @param loginData Login data.
	 */
	public login(loginData: Login): Observable<void> {
		return this.authService.login(loginData).pipe(
			this.saveSecretAndWaitForAuthorized(),
		);
	}

	/**
	 * Logout current user.
	 */
	public logout(): Observable<void> {
		return this.userSecretStorage.removeSecret();
	}

	/**
	 * Requests to reset the password.
	 * @param data Data for resetting the password.
	 * @returns Message for the user.
	 */
	public resetPassword(data: PasswordReset.Data): Observable<string> {
		return this.authService.resetPassword(data);
	}

	/**
	 * Set new password and confirm resetting.
	 * @param data Confirm password reset.
	 * @returns Success message.
	 */
	public confirmPasswordReset(data: PasswordReset.Confirmation): Observable<string> {
		return this.authService.confirmPasswordReset(data);
	}

	private saveSecretAndWaitForAuthorized(): OperatorFunction<UserSecret, void> {
		return pipe(
			switchMap(secret => {
				const saveUserSecretSideEffect$ = this.userSecretStorage.saveSecret(secret).pipe(ignoreElements());

				return merge(
					this.isAuthorized$,
					saveUserSecretSideEffect$,
				);
			}),
			first(isAuthorized => isAuthorized),
			map(() => undefined),
		);
	}

	private initCurrentUserStream(): Observable<User | null> {
		return this.userSecretStorage.currentSecret$.pipe(
			switchMap(secret => (secret ? this.userApiService.getCurrentUser() : of(null))),
			shareReplay({ bufferSize: 1, refCount: false }),
		);
	}
}
