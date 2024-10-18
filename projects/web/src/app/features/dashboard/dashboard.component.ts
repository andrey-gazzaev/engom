import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { AppConfig } from '@engom/common/core/services/app.config';
import { UserService } from '@engom/common/core/services/user.service';
import { toggleExecutionState } from '@engom/common/core/utils/rxjs/toggle-execution-state';
import { BehaviorSubject, startWith, Subject, switchMap, take, tap } from 'rxjs';
import { LoadingDirective } from '@engom/common/shared/directives/loading.directive';
import { RouterLink } from '@angular/router';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { UserApiService } from '@engom/common/core/services/user-api.service';
import { TaskApiService } from '@engom/common/core/services/task-api.service';
import { filterNull } from '@engom/common/core/utils/rxjs/filter-null';
import { Task } from '@engom/common/core/models/task';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { UserGroupsComponent } from './components/user-groups/user-groups.component';
import { TasksComponent } from './components/tasks/tasks.component';

/** Placeholder dashboard. */
@Component({
	selector: 'engomw-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [MatIconModule, LoadingDirective, RouterLink, AsyncPipe, JsonPipe, UserGroupsComponent, TasksComponent],
})
export class DashboardComponent {
	/** Users service. */
	protected readonly userService = inject(UserService);

	/** App config service. */
	protected readonly appConfigService = inject(AppConfig);

	private readonly usersApiService = inject(UserApiService);

	private readonly taskApiService = inject(TaskApiService);

	private readonly destroyRef = inject(DestroyRef);

	/** Whether the controls should be marked as in loading state. */
	protected readonly isLoading$ = new BehaviorSubject<boolean>(false);

	private readonly refreshTasks$ = new Subject<void>();

	/** All users. */
	protected readonly users$ = this.usersApiService.getUsers().pipe(toggleExecutionState(this.isLoading$));

	/** Current user task. */
	protected readonly userTasks$ = this.refreshTasks$.pipe(
		startWith(null),
		switchMap(() => this.userService.currentUser$),
		filterNull(),
		switchMap(({ id }) => this.taskApiService.getTasksByUserId(id)),
	);

	/**
	 * Handles a click on the complete button.
	 * @param task Task to be completed.
	 */
	protected onCompleteTaskClick(task: Task): void {
		this.userService.currentUser$
			.pipe(
				take(1),
				filterNull(),
				switchMap(user => this.taskApiService.completeTask(user.id, task.id)),
				tap(() => this.refreshTasks$.next()),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe();
	}

	/**
	 * Handles a click on the uncomplete button.
	 * @param task Task to be uncompleted.
	 */
	protected onUncompleteTaskClick(task: Task): void {
		this.userService.currentUser$
			.pipe(
				take(1),
				filterNull(),
				switchMap(user => this.taskApiService.uncompleteTask(user.id, task.id)),
				tap(() => this.refreshTasks$.next()),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe();
	}
}
