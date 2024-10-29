import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { Group } from '@engom/common/core/models/group';
import { UserService } from '@engom/common/core/services/user.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';
import { UserApiService } from '@engom/common/core/services/user-api.service';
import { filterNull } from '@engom/common/core/utils/rxjs/filter-null';
import { FullNamePipe } from '@engom/common/shared/pipes/fullname.pipe';
import { TaskApiService } from '@engom/common/core/services/task-api.service';

import { UserGroupsComponent } from '../components/user-groups/user-groups.component';
import { UserTasksComponent } from '../components/user-tasks/user-tasks.component';

/** Teacher dashboard component. */
@Component({
	selector: 'engomw-teacher-dashboard',
	templateUrl: 'teacher-dashboard.component.html',
	styleUrl: 'teacher-dashboard.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [UserGroupsComponent, AsyncPipe, JsonPipe, FullNamePipe, UserTasksComponent],
})
export class TeacherDashboardComponent {
	/** @see {@link UserService}. */
	protected readonly userService = inject(UserService);

	private readonly userApiService = inject(UserApiService);

	private readonly taskApiService = inject(TaskApiService);

	/** Selected group. */
	protected readonly selectedGroup = signal<Group | null>(null);

	private readonly selectedGroup$ = toObservable(this.selectedGroup);

	/** Teacher selected users group. */
	protected readonly groupUsers$ = this.selectedGroup$.pipe(
		filterNull(),
		switchMap(selectedGroup => this.userApiService.getGroupUsers(selectedGroup)),
		map(users => users.filter(({ role }) => role !== 'teacher')),
	);

	/** Group tasks. */
	protected readonly groupTasks$ = this.selectedGroup$.pipe(
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
}
