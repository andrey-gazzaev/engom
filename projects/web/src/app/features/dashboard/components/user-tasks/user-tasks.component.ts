import { ChangeDetectionStrategy, Component, model, output } from '@angular/core';

import { UserTask } from '@engom/common/core/models/user-task';

/** User tasks component. */
@Component({
	selector: 'engomw-user-tasks',
	templateUrl: 'user-tasks.component.html',
	styleUrl: 'user-tasks.component.css',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTasksComponent {
	/** Tasks. */
	public readonly tasks = model<UserTask[]>([]);

	/** Emits when uncomplete button is clicked. */
	public readonly uncompleteClicked = output<UserTask>();

	/** Emits when complete button is clicked. */
	public readonly completeClicked = output<UserTask>();

	/**
	 * Handles a click on the uncomplete button.
	 * @param task Task to be uncompleted.
	 */
	protected onUncompleteClick(task: UserTask): void {
		this.uncompleteClicked.emit(task);
	}

	/**
	 * Handles a click on the complete button.
	 * @param task Task to be completed.
	 */
	protected onCompleteClick(task: UserTask): void {
		this.completeClicked.emit(task);
	}
}
