import { inject, InjectionToken, Provider } from '@angular/core';
import { buildRoutePaths } from '@engom/common/core/utils/route-paths/build-route-paths';
import { commonRoutePaths } from '@engom/common/core/utils/route-paths/common-route-paths';

/** Injection token that provide object with route web app paths. */
const WEB_ROUTE_PATHS_TOKEN = new InjectionToken<WebRoutePaths>('Provide object with web route paths');

/**
 * Web route paths object.
 * It's intended to be used only in Routing modules.
 * So don't import this object directly into components.
 * Prefer to use `injectWebAppRoutes` instead.
 * It's necessary to make our component more flexible for unit tests.
 * @example
 * ```ts
 * const routes: Routes = [
 *   { path: webRoutePaths.home, component: HomePageComponent },
 *   // ...
 * ];
 * ```
 */
export const webRoutePaths = buildRoutePaths({
	...commonRoutePaths,
	dashboard: { path: 'dashboard' },
	auth: {
		path: 'auth',
		children: {
			login: { path: 'login' },
			forgotPassword: { path: 'forgot-password' },
			confirmPassword: { path: 'confirm-password' },
			register: { path: 'register' },
		},
	},
} as const);

type WebRoutePaths = typeof webRoutePaths;

/** Create provider for a web route paths. */
export function provideWebAppRoutes(): Provider {
	return {
		provide: WEB_ROUTE_PATHS_TOKEN,
		useValue: webRoutePaths,
	};
}

/**
 * Inject web app route paths to component.
 * Warning: Method should be called in the constructor phase to avoid runtime error because of `inject()`.
 * @example
 * ```ts
 * class SomeComponent {
 *   // ...
 *   protected readonly routePaths = injectWebAppRoutes();
 *   public constructor() { };
 * }
 * ```
 */
export function injectWebAppRoutes(): WebRoutePaths {
	return inject(WEB_ROUTE_PATHS_TOKEN);
}
