import { Routes } from '@angular/router';

import { userRoleGuard } from '@engom/common/core/guards/user-role-guard';

import { webRoutePaths } from '../shared/web-route-paths';

import { DashboardComponent } from './dashboard.component';

/** Dashboard routes. */
export const dashboardRoutes: Routes = [
	{
		path: '',
		component: DashboardComponent,
		children: [
			{
				path: webRoutePaths.dashboard.children.student.path,
				canActivate: [
					userRoleGuard({
						allowedRoles: ['admin', 'student'],
						redirectUrl: webRoutePaths.dashboard.children.teacher.url,
					}),
				],
				loadComponent: async() =>
					(await import('./student-dashboard/student-dashboard.component')).StudentDashboardComponent,
			},
			{
				path: webRoutePaths.dashboard.children.teacher.path,
				canActivate: [
					userRoleGuard({
						allowedRoles: ['admin', 'teacher'],
					}),
				],
				loadComponent: async() =>
					(await import('./teacher-dashboard/teacher-dashboard.component')).TeacherDashboardComponent,
			},
			{ path: '', pathMatch: 'full', redirectTo: webRoutePaths.dashboard.children.student.path },
		],
	},
];
