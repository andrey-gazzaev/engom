import { map } from 'rxjs';
import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '@engom/common/core/services/user.service';
import { webRoutePaths } from 'projects/web/src/app/features/shared/web-route-paths';

type AuthGuardParams = {

	/**
	 * Whether guard is configured for currently authorized user or not.
	 * If 'true', guard will prevent a current user from accessing a route if he is not authorized.
	 * If 'false', guard will prevent a current user from accessing a route if he is authorized.
	 */
	readonly isAuthorized: boolean;
};

/**
 * Auth guard.
 * @param isAuthorized Whether guard is configured for currently authorized user or not.
 */
export function authGuard({ isAuthorized }: AuthGuardParams): CanMatchFn {
	return () => {
		const userService = inject(UserService);
		const router = inject(Router);

		return userService.isAuthorized$.pipe(
			map(isUserAuthorized => {
				if (isAuthorized) {
					return isUserAuthorized ? true : router.parseUrl(webRoutePaths.auth.path);
				}

				return isUserAuthorized ? router.parseUrl(webRoutePaths.dashboard.path) : true;
			}),
		);
	};
}
