import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Task } from '@engom/common/core/models/task';
import { enumToArray } from '@engom/common/core/utils/enum-to-array';
import { AbstractTableComponent } from '@engom/common/shared/components/abstract-table/abstaract-table';
import { SkeletonComponent } from '@engom/common/shared/components/skeleton/skeleton.component';
import { TypedMatCellDirective } from '@engom/common/shared/directives/typed-mat-cell.directive';

/** Table column. */
enum Column {
	Number = 'number',
	Description = 'description',
	Dictionary = 'dictionary',
	Actions = 'actions',
}

/** Group tasks component. */
@Component({
	selector: 'engomw-group-tasks',
	templateUrl: 'group-tasks.component.html',
	styleUrl: 'group-tasks.component.css',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [MatTableModule, SkeletonComponent, TypedMatCellDirective, MatButton, MatIcon, MatIconButton],
})
export class GroupTasksComponent extends AbstractTableComponent<Task, Column> {
	/** @inheritdoc */
	protected override readonly tableColumn = Column;

	/** @inheritdoc */
	public override displayedColumns = enumToArray(Column);

	/** Emits when assign task button is clicked. */
	public readonly assignTaskClicked = output();

	/** Emits when unassign task button is clicked. */
	public readonly unassignTaskClicked = output<Task>();

	/** Handles assigning task click. */
	protected onAssignTaskClick(): void {
		this.assignTaskClicked.emit();
	}

	/**
	 * Handles unassign task click.
	 * @param task Task to unassign.
	 */
	protected onUnassignTaskClick(task: Task): void {
		this.unassignTaskClicked.emit(task);
	}
}
