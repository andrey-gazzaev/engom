import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Login } from '../models/login';
import { PasswordChange } from '../models/password-change';
import { PasswordReset } from '../models/password-reset';
import { UserSecret } from '../models/user-secret';

import { AppErrorMapper } from '../mappers/app-error.mapper';
import { LoginDataMapper } from '../mappers/login-data.mapper';
import { PasswordChangeMapper } from '../mappers/password-change.mapper';
import { ResetPasswordConfirmationMapper } from '../mappers/reset-password-confirmation.mapper';
import { ResetPasswordMapper } from '../mappers/reset-password.mapper';
import { UserSecretDataMapper } from '../mappers/user-secret-data.mapper';

import { userSecretDtoSchema } from '../dtos/user-secret.dto';
import { successResponseDtoSchema } from '../dtos/success-response.dto';

import { AppUrlsConfig } from './app-urls.config';

/**
 * Performs CRUD operations for auth-related information.
 */
@Injectable({ providedIn: 'root' })
export class AuthApiService {

	private readonly httpClient = inject(HttpClient);

	private readonly apiUrlsConfig = inject(AppUrlsConfig);

	private readonly loginDataMapper = inject(LoginDataMapper);

	private readonly appErrorMapper = inject(AppErrorMapper);

	private readonly userSecretMapper = inject(UserSecretDataMapper);

	private readonly resetPasswordMapper = inject(ResetPasswordMapper);

	private readonly resetPasswordConfirmationMapper = inject(ResetPasswordConfirmationMapper);

	private readonly passwordChangeMapper = inject(PasswordChangeMapper);

	/**
	 * Login a user with email and password.
	 * @param loginData Login data.
	 */
	public login(loginData: Login): Observable<UserSecret> {
		return this.httpClient.post<unknown>(
			this.apiUrlsConfig.auth.login,
			this.loginDataMapper.toDto(loginData),
		)
			.pipe(
				map(response => userSecretDtoSchema.parse(response)),
				map(secretDto => this.userSecretMapper.fromDto(secretDto)),
				this.appErrorMapper.catchHttpErrorToAppErrorWithValidationSupport(
					this.loginDataMapper,
				),
			);
	}

	/**
	 * Refresh user's secret.
	 * @param secret Secret data.
	 */
	public refreshSecret(
		secret: UserSecret,
	): Observable<UserSecret> {
		return this.httpClient.post<unknown>(
			this.apiUrlsConfig.auth.refreshSecret,
			this.userSecretMapper.toDto(secret),
		)
			.pipe(
				map(response => userSecretDtoSchema.parse(response)),
				map(secretDto => this.userSecretMapper.fromDto(secretDto)),
				this.appErrorMapper.catchHttpErrorToAppError(),
			);
	}

	/**
	 * Sends request to reset the password.
	 * @param data Data for password reset.
	 * @returns Success message.
	 */
	public resetPassword(data: PasswordReset.Data): Observable<string> {
		return this.httpClient.post<unknown>(
			this.apiUrlsConfig.auth.resetPassword,
			this.resetPasswordMapper.toDto(data),
		)
			.pipe(
				map(response => successResponseDtoSchema.parse(response)),
				map(responseDto => responseDto.detail),
				this.appErrorMapper.catchHttpErrorToAppErrorWithValidationSupport(
					this.resetPasswordMapper,
				),
			);
	}

	/**
	 * Confirms password reset and applies new passwords to the account.
	 * @param data New passwords data.
	 * @returns Success message.
	 */
	public confirmPasswordReset(
		data: PasswordReset.Confirmation,
	): Observable<string> {
		return this.httpClient.post<unknown>(
			this.apiUrlsConfig.auth.confirmPasswordReset,
			this.resetPasswordConfirmationMapper.toDto(data),
		)
			.pipe(
				map(response => successResponseDtoSchema.parse(response)),
				map(responseDto => responseDto.detail),
				this.appErrorMapper.catchHttpErrorToAppErrorWithValidationSupport(
					this.resetPasswordConfirmationMapper,
				),
			);
	}

	/**
	 * Changes password of current user.
	 * @param data Data required for password changing.
	 */
	public changePassword(data: PasswordChange): Observable<void> {
		return this.httpClient.post<unknown>(
			this.apiUrlsConfig.user.changePassword,
			this.passwordChangeMapper.toDto(data),
		)
			.pipe(
				map(response => successResponseDtoSchema.parse(response)),
				map(() => undefined),
				this.appErrorMapper.catchHttpErrorToAppErrorWithValidationSupport(
					this.passwordChangeMapper,
				),
			);
	}
}
