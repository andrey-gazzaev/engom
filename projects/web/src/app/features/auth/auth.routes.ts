import { Routes } from '@angular/router';

import { webRoutePaths } from '../shared/web-route-paths';

import { ConfirmResetPasswordComponent } from './confirm-reset-password/confirm-reset-password.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const authModulePaths = webRoutePaths.auth.children;

/** Auth routes. */
export const authRoutes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: authModulePaths.login.path },
	{ path: authModulePaths.login.path, component: LoginComponent },
	{ path: authModulePaths.forgotPassword.path, component: ResetPasswordComponent },
	{ path: authModulePaths.confirmPassword.path, component: ConfirmResetPasswordComponent },
];
