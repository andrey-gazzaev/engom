import { Routes } from '@angular/router';

import { webRoutePaths } from './features/shared/web-route-paths';

/**
 * Routes object are described based on the created by `buildRoutePaths` object.
 * In some cases, when we define children for dynamic parameters, we must initialize
 * this parameter with an empty string, as in the example below.
 * This behavior is allowed in routing modules.
 * @example
 * ```ts
 * const routePaths = buildRoutePaths({
 *   dashboard: {
 *     path: 'dashboard',
 *     children: {
 *       auth: { path: 'auth' },
 *       users: {
 *         path: ':id',
 *         children: {
 *           edit: { path: 'edit' },
 *         },
 *       },
 *     },
 *   },
 * } as const);
 *
 * const routes: Routes = [
 *   {
 *     path: routePaths.dashboard.path,
 *     children: [
 *       {
 *         path: routePaths.dashboard.children.auth.path,
 *         component: AuthComponent,
 *       },
 *       {
 *         path: routePaths.dashboard.children.users.path,
 *         children: [
 *           {
 *             path: routePaths.dashboard.children.users.children({ id: '' }).edit.path,
 *             component: EditUserComponent,
 *           },
 *         ],
 *       },
 *     ],
 *   };
 * ];
 * ```
 */
export const appRoutes: Routes = [
	{
		path: '',
		redirectTo: webRoutePaths.dashboard.path,
		pathMatch: 'full',
	},
	{
		path: webRoutePaths.auth.path,
		loadChildren: () =>
			import('./features/auth/auth.routes').then(r => r.authRoutes),
	},
	{
		path: webRoutePaths.dashboard.path,
		loadChildren: () =>
			import('./features/dashboard/dashboard.routes').then(
				r => r.dashboardRoutes,
			),
	},
];
