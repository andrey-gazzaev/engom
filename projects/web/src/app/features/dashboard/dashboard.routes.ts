import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

/** Dashboard routes. */
export const dashboardRoutes: Routes = [
	{
		path: '',
		component: DashboardComponent,
		children: [
			{
				path: 'student',
				loadComponent: async () =>
					(await import('./student-dashboard/student-dashboard.component')).StudentDashboardComponent,
			},
			{ path: '', pathMatch: 'full', redirectTo: 'student' },
		],
	},
];
