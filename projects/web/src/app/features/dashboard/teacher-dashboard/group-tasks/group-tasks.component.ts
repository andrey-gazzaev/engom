import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatButton } from '@angular/material/button';
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
}

/** Group tasks component. */
@Component({
	selector: 'engomw-group-tasks',
	templateUrl: 'group-tasks.component.html',
	styleUrl: 'group-tasks.component.css',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [MatTableModule, SkeletonComponent, TypedMatCellDirective, MatButton],
})
export class GroupTasksComponent extends AbstractTableComponent<Task, Column> {

	/** @inheritdoc */
	protected override readonly tableColumn = Column;

	/** @inheritdoc */
	public override displayedColumns = enumToArray(Column);

	/** Assign task clicked. */
	public readonly assignTaskClicked = output();

	/** Handles assigning task click. */
	protected onAssignTaskClick(): void {
		this.assignTaskClicked.emit();
	}
}
