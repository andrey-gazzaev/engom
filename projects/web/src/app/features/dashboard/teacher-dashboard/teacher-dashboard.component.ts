import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { Group } from '@engom/common/core/models/group';
import { UserService } from '@engom/common/core/services/user.service';
import { AsyncPipe } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';
import { BehaviorSubject, map, startWith, Subject, switchMap, tap } from 'rxjs';
import { UserApiService } from '@engom/common/core/services/user-api.service';
import { filterNull } from '@engom/common/core/utils/rxjs/filter-null';
import { FullNamePipe } from '@engom/common/shared/pipes/fullname.pipe';
import { TaskApiService } from '@engom/common/core/services/task-api.service';
import { DialogService } from '@engom/common/core/services/dialog.service';
import { toggleExecutionState } from '@engom/common/core/utils/rxjs/toggle-execution-state';
import { filterFalseDialogResult } from '@engom/common/core/utils/rxjs/filter-false-dialog-result';

import { UserGroupsComponent } from '../components/user-groups/user-groups.component';
import { UserTasksComponent } from '../components/user-tasks/user-tasks.component';
import { AssignTaskDialogComponent } from '../components/assign-task-dialog/assign-task-dialog.component';

import { GroupStudentsComponent } from './group-students/group-students.component';

/** Teacher dashboard component. */
@Component({
	selector: 'engomw-teacher-dashboard',
	templateUrl: 'teacher-dashboard.component.html',
	styleUrl: 'teacher-dashboard.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [UserGroupsComponent, AsyncPipe, FullNamePipe, UserTasksComponent, GroupStudentsComponent],
})
export class TeacherDashboardComponent {
	/** @see {@link UserService}. */
	protected readonly userService = inject(UserService);

	private readonly userApiService = inject(UserApiService);

	private readonly taskApiService = inject(TaskApiService);

	private readonly dialogService = inject(DialogService);

	/** Selected group. */
	protected readonly selectedGroup = signal<Group | null>(null);

	private readonly selectedGroup$ = toObservable(this.selectedGroup);

	/** Is students loading. */
	protected readonly isStudentsLoading$ = new BehaviorSubject(false);

	/** Group students. */
	protected readonly students$ = this.selectedGroup$.pipe(
		filterNull(),
		switchMap(selectedGroup => this.userApiService.getGroupUsers(selectedGroup).pipe(
			toggleExecutionState(this.isStudentsLoading$),
		)),
		map(users => users.filter(({ role }) => role !== 'teacher')),
	);

	private readonly refreshGroupTasks$ = new Subject<void>();

	/** Group tasks. */
	protected readonly groupTasks$ = this.refreshGroupTasks$.pipe(
		startWith(null),
		switchMap(() => this.selectedGroup$),
		filterNull(),
		switchMap(selectedGroup => this.taskApiService.getGroupTasks(selectedGroup)),
	);

	/**
	 * Handles clicks on a group.
	 * @param group Group.
	 */
	protected onGroupClick(group: Group): void {
		this.selectedGroup.set(group);
	}

	/** Handles assigning task click. */
	protected onAssignTaskClick(): void {
		this.dialogService
			.openDialog(AssignTaskDialogComponent, {
				data: {
					group: this.selectedGroup(),
				},
			})
			.afterClosed()
			.pipe(
				filterFalseDialogResult(),
				tap(() => {
					this.refreshGroupTasks$.next();
				}),
			)
			.subscribe();
	}
}
