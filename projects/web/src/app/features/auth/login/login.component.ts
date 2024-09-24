import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Login, loginSchema } from '@engom/common/core/models/login';
import { UserService } from '@engom/common/core/services/user.service';
import { catchValidationData } from '@engom/common/core/utils/rxjs/catch-validation-error';
import { toggleExecutionState } from '@engom/common/core/utils/rxjs/toggle-execution-state';
import { FlatControlsOf } from '@engom/common/core/utils/types/controls-of';
import { BehaviorSubject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoadingDirective } from '@engom/common/shared/directives/loading.directive';
import { LabelComponent } from '@engom/common/shared/components/label/label.component';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { injectWebAppRoutes } from '../../shared/web-route-paths';

type LoginFormData = FlatControlsOf<Login>;

/** Login page. */
@Component({
	selector: 'engomw-login',
	templateUrl: './login.component.html',
	styleUrls: ['../auth.css', './login.component.css'],
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
export class LoginComponent {

	/** Is app loading. */
	protected readonly isLoading$ = new BehaviorSubject<boolean>(false);

	/** Login form. */
	protected readonly loginForm: FormGroup<LoginFormData>;

	/** Auth child route paths. */
	protected readonly authChildPaths = injectWebAppRoutes().auth.children;

	private readonly fb = inject(NonNullableFormBuilder);

	private readonly userService = inject(UserService);

	private readonly destroyRef = inject(DestroyRef);

	public constructor() {
		this.loginForm = this.initLoginForm();
	}

	/**
	 * Handle 'submit' of the login form.
	 */
	protected onSubmit(): void {
		this.loginForm.markAllAsTouched();
		if (this.loginForm.invalid) {
			return;
		}
		const loginData = loginSchema.parse(this.loginForm.value);
		this.userService.login(loginData).pipe(
			toggleExecutionState(this.isLoading$),
			catchValidationData(this.loginForm),
			takeUntilDestroyed(this.destroyRef),
		)
			.subscribe();
	}

	private initLoginForm(): FormGroup<LoginFormData> {
		return this.fb.group<LoginFormData>({
			email: this.fb.control('', [Validators.required, Validators.email]),
			password: this.fb.control('', Validators.required),
		});
	}
}
