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

	public readonly uncompleteClicked = output<Task>();

	public readonly completeClicked = output<Task>();

	/**
	 * Handles
	 * @param task
	 */
	protected onUncompleteClick(task: Task): void {
		this.uncompleteClicked.emit(task);
	}

	protected onCompleteClick(task: Task): void {
		this.completeClicked.emit(task);
	}
}
