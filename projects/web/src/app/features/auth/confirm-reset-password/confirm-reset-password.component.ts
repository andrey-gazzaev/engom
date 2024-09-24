import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { passwordResetConfirmationSchema } from '@engom/common/core/models/password-reset';
import { UserService } from '@engom/common/core/services/user.service';
import { assertNonNull } from '@engom/common/core/utils/assert-non-null';
import { catchValidationData } from '@engom/common/core/utils/rxjs/catch-validation-error';
import { toggleExecutionState } from '@engom/common/core/utils/rxjs/toggle-execution-state';
import { FlatControlsOf } from '@engom/common/core/utils/types/controls-of';
import { AppValidators } from '@engom/common/core/utils/validators';
import { BehaviorSubject } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoadingDirective } from '@engom/common/shared/directives/loading.directive';
import { LabelComponent } from '@engom/common/shared/components/label/label.component';
import { AsyncPipe } from '@angular/common';
import { z } from 'zod';

import { injectWebAppRoutes } from '../../shared/web-route-paths';

/** Reset confirmation token query key. */
export const RESET_CONFIRMATION_TOKEN_QUERY_KEY = 'token';

const confirmResetPasswordFormDataSchema = passwordResetConfirmationSchema.omit({ key: true });
type ConfirmResetPasswordFormData = FlatControlsOf<z.infer<typeof confirmResetPasswordFormDataSchema>>;

/**
 * This page is used for confirming a password reset after it is initiated by the `ResetPasswordComponent`.
 * It is usually opened by user via link that is sent to them via email.
 * Accepts a secret token as a query parameter, and uses it to confirm the password reset.
 * @see ResetPasswordComponent.
 *
 *
 * The URL to this page is usually discussed with the BE team since they are the ones who are responsible for sending the link to a user.
 * Recommended to use this URL `/confirm-password?token=<secret-token>`.
 */
@Component({
	selector: 'engomw-confirm-reset-password',
	templateUrl: './confirm-reset-password.component.html',
	styleUrls: ['../auth.css', 'confirm-reset-password.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [
		ReactiveFormsModule,
		LabelComponent,
		RouterLink,
		LoadingDirective,
		AsyncPipe,
	],
})
export class ConfirmResetPasswordComponent {

	/** Whether the form is being submitted. */
	protected readonly isLoading$ = new BehaviorSubject<boolean>(false);

	/** Login form. */
	protected readonly form: FormGroup<ConfirmResetPasswordFormData>;

	/** Auth child route paths. */
	protected readonly authChildPaths = injectWebAppRoutes().auth.children;

	private readonly fb = inject(NonNullableFormBuilder);

	private readonly userService = inject(UserService);

	private readonly activatedRoute = inject(ActivatedRoute);

	private readonly router = inject(Router);

	private readonly destroyRef = inject(DestroyRef);

	public constructor() {
		this.form = this.initLoginForm();
	}

	/** Handles the form submission. */
	protected onSubmit(): void {
		this.form.markAllAsTouched();
		if (this.form.invalid) {
			return;
		}

		const key$ = this.activatedRoute.queryParamMap.pipe(
			first(),
			map(paramMap => {
				const key = paramMap.get(RESET_CONFIRMATION_TOKEN_QUERY_KEY);
				assertNonNull(key);

				return key;
			}),
		);

		key$.pipe(
			switchMap(key =>
				this.userService.confirmPasswordReset({
					...confirmResetPasswordFormDataSchema.parse(this.form.value),
					key,
				})),
			toggleExecutionState(this.isLoading$),
			catchValidationData(this.form),
			takeUntilDestroyed(this.destroyRef),
		)
			.subscribe({
				complete: () => this.router.navigateByUrl(this.authChildPaths.login.url),
			});
	}

	private initLoginForm(): FormGroup<ConfirmResetPasswordFormData> {
		return this.fb.group<ConfirmResetPasswordFormData>({
			password: this.fb.control('', Validators.required),
			passwordConfirmation: this.fb.control('', [Validators.required, AppValidators.matchControl('password')]),
		});
	}
}
