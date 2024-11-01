import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Group } from '@engom/common/core/models/group';
import { Task } from '@engom/common/core/models/task';
import { TaskApiService } from '@engom/common/core/services/task-api.service';
import { AbstractDialogComponent } from '@engom/common/shared/components/abstract-dialog/abstract-dialog';
import { tap } from 'rxjs';

type DialogData = {

	/** Group. */
	readonly group: Group;
};

/** Assign task dialog component. */
@Component({
	selector: 'engomw-assign-task-dialog',
	templateUrl: 'assign-task-dialog.component.html',
	styleUrl: 'assign-task-dialog.component.css',
	standalone: true,
	imports: [AsyncPipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignTaskDialogComponent extends AbstractDialogComponent<DialogData, boolean> {
	private readonly taskApiService = inject(TaskApiService);

	private readonly destroyRef = inject(DestroyRef);

	/** Available group tasks. */
	protected readonly availableGroupTasks$ = this.taskApiService.getAvailableGroupTasks(this.dialogData.group);

	/**
	 * Handles assigning task.
	 * @param task Task to be assigned.
	 */
	protected onAssignTask(task: Task): void {
		this.taskApiService
			.assignTaskToGroup(task, this.dialogData.group)
			.pipe(
				tap(() => {
					this.dialogRef.close(true);
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe();
	}

	/** @inheritdoc */
	protected override onClose(): void {
		this.dialogRef.close(false);
	}
}
