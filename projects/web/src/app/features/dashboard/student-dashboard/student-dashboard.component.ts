import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { AppConfig } from '@engom/common/core/services/app.config';
import { TaskApiService } from '@engom/common/core/services/task-api.service';
import { UserApiService } from '@engom/common/core/services/user-api.service';
import { UserService } from '@engom/common/core/services/user.service';
import { filterNull } from '@engom/common/core/utils/rxjs/filter-null';
import { toggleExecutionState } from '@engom/common/core/utils/rxjs/toggle-execution-state';
import { LoadingDirective } from '@engom/common/shared/directives/loading.directive';
import { BehaviorSubject, Subject, startWith, switchMap, take, tap } from 'rxjs';

import { Task } from '@engom/common/core/models/task';

import { TasksComponent } from '../components/tasks/tasks.component';
import { UserGroupsComponent } from '../components/user-groups/user-groups.component';

/** Student dashboard component. */
@Component({
	selector: 'engomw-student-dashboard',
	templateUrl: 'student-dashboard.component.html',
	styleUrl: 'student-dashboard.component.css',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [MatIconModule, LoadingDirective, RouterLink, AsyncPipe, JsonPipe, UserGroupsComponent, TasksComponent],
})
export class StudentDashboardComponent {
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
		switchMap(({ id }) => this.taskApiService.getUserTasksByUserId(id)),
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
