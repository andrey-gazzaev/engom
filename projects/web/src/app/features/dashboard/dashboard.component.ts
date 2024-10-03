import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { AppConfig } from '@engom/common/core/services/app.config';
import { UserService } from '@engom/common/core/services/user.service';
import { toggleExecutionState } from '@engom/common/core/utils/rxjs/toggle-execution-state';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoadingDirective } from '@engom/common/shared/directives/loading.directive';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { UserApiService } from '@engom/common/core/services/user-api.service';
import { FullNamePipe } from '@engom/common/shared/pipes/fullname.pipe';
import { TaskApiService } from '@engom/common/core/services/task-api.service';
import { filterNull } from '@engom/common/core/utils/rxjs/filter-null';

import { injectWebAppRoutes } from '../shared/web-route-paths';

/** Placeholder dashboard. */
@Component({
	selector: 'engomw-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [MatIconModule, LoadingDirective, RouterLink, AsyncPipe, JsonPipe, FullNamePipe],
})
export class DashboardComponent {
	/** Users service. */
	protected readonly userService = inject(UserService);

	/** App config service. */
	protected readonly appConfigService = inject(AppConfig);

	private readonly router = inject(Router);

	private readonly usersApiService = inject(UserApiService);

	private readonly tasksApiService = inject(TaskApiService);

	private readonly destroyRef = inject(DestroyRef);

	/** Whether the controls should be marked as in loading state. */
	protected readonly isLoading$ = new BehaviorSubject<boolean>(false);

	/** Route paths. */
	protected readonly routePaths = injectWebAppRoutes();

	/** All users. */
	protected readonly users$ = this.usersApiService.getUsers().pipe(toggleExecutionState(this.isLoading$));

	/** Current user task. */
	protected readonly userTasks$ = this.userService.currentUser$.pipe(
		filterNull(),
		switchMap(({ id }) => this.tasksApiService.getTasksByUserId(id)),
	);

	/** Handles click on logout button. */
	protected onLogoutClick(): void {
		this.userService
			.logout()
			.pipe(
				tap(() => this.router.navigate([this.routePaths.auth.children.login.url])),
				toggleExecutionState(this.isLoading$),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe();
	}
}
