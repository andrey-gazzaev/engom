import { ChangeDetectionStrategy, Component, model, output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Group } from '@engom/common/core/models/group';

/** User groups component. */
@Component({
	selector: 'engomw-user-groups',
	styleUrl: 'user-groups.component.css',
	templateUrl: 'user-groups.component.html',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [MatButton],
})
export class UserGroupsComponent {

	/** Groups. */
	public readonly groups = model<readonly Group[]>([]);

	/** Selected group. */
	public readonly selectedGroup = model<Group | null>(null);

	/** Emits when group button is clicked. */
	public readonly groupClicked = output<Group>();

	/**
	 * Handles clicks on a group button.
	 * @param group Group.
	 */
	protected onGroupButtonClick(group: Group): void {
		this.groupClicked.emit(group);
	}
}
