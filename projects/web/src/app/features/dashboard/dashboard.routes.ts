import { Routes } from '@angular/router';

import { userRoleGuard } from '@engom/common/core/guards/user-role-guard';

import { DashboardComponent } from './dashboard.component';

/** Dashboard routes. */
export const dashboardRoutes: Routes = [
	{
		path: '',
		component: DashboardComponent,
		children: [
			{
				path: 'student',
				canActivate: [
					userRoleGuard({
						allowedRoles: ['admin', 'student'],
					}),
				],
				loadComponent: async() =>
					(await import('./student-dashboard/student-dashboard.component')).StudentDashboardComponent,
			},
			{ path: '', pathMatch: 'full', redirectTo: 'student' },
		],
	},
];
