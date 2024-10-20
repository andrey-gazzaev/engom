import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { Group } from '@engom/common/core/models/group';
import { UserService } from '@engom/common/core/services/user.service';
import { AsyncPipe, JsonPipe } from '@angular/common';

import { UserGroupsComponent } from '../components/user-groups/user-groups.component';

/** Teacher dashboard component. */
@Component({
	selector: 'engomw-teacher-dashboard',
	templateUrl: 'teacher-dashboard.component.html',
	styleUrl: 'teacher-dashboard.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [UserGroupsComponent, AsyncPipe, JsonPipe],
})
export class TeacherDashboardComponent {
	/** @see {@link UserService}. */
	protected readonly userService = inject(UserService);

	/** Selected group. */
	protected readonly selectedGroup = signal<Group | null>(null);

	/**
	 * Handles clicks on a group.
	 * @param group Group.
	 */
	protected onGroupClick(group: Group): void {
		this.selectedGroup.set(group);
	}
}
