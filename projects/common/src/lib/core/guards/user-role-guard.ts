import { map } from 'rxjs';
import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { webRoutePaths } from 'projects/web/src/app/features/shared/web-route-paths';

import { UserRole } from '../models/user-role';
import { UserService } from '../services/user.service';

type UserRoleGuardParams = {

	/** Roles which are allowed to access the page. */
	readonly allowedRoles: readonly UserRole[];

	/** The URL to which the user will be redirected if he does not have rights to access the page. */
	readonly redirectUrl?: string;
};

/**
 * User role guard.
 * @param allowedRoles Roles which are allowed to access the page.
 */
export function userRoleGuard({ allowedRoles, redirectUrl = webRoutePaths.dashboard.path }: UserRoleGuardParams): CanMatchFn {
	return () => {
		const userService = inject(UserService);
		const router = inject(Router);

		return userService.currentUser$.pipe(
			map(currentUser => {
				if (currentUser === null) {
					return router.parseUrl(webRoutePaths.auth.path);
				}
				return allowedRoles.includes(currentUser.role) ? true : router.parseUrl(redirectUrl);
			}),
		);
	};
}
