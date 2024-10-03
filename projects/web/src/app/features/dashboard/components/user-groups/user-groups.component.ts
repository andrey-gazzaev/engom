import { ChangeDetectionStrategy, Component, model } from '@angular/core';
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
}
