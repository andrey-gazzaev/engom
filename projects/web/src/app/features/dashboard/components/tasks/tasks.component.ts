import { ChangeDetectionStrategy, Component, model, output } from '@angular/core';

import { Task } from '@engom/common/core/models/task';

/** Tasks component. */
@Component({
	selector: 'engomw-tasks',
	templateUrl: 'tasks.component.html',
	styleUrl: 'tasks.component.css',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent {
	/** Tasks. */
	public readonly tasks = model<readonly Task[]>([]);

	/** Emits when uncomplete button is clicked. */
	public readonly uncompleteClicked = output<Task>();

	/** Emits when complete button is clicked. */
	public readonly completeClicked = output<Task>();

	/**
	 * Handles a click on the uncomplete button.
	 * @param task Task to be uncompleted.
	 */
	protected onUncompleteClick(task: Task): void {
		this.uncompleteClicked.emit(task);
	}

	/**
	 * Handles a click on the complete button.
	 * @param task Task to be completed.
	 */
	protected onCompleteClick(task: Task): void {
		this.completeClicked.emit(task);
	}
}
