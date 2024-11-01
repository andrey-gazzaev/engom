import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Group } from '@engom/common/core/models/group';
import { User } from '@engom/common/core/models/user';
import { MatTableModule } from '@angular/material/table';
import { AbstractTableComponent } from '@engom/common/shared/components/abstract-table/abstaract-table';
import { enumToArray } from '@engom/common/core/utils/enum-to-array';
import { FullNamePipe } from '@engom/common/shared/pipes/fullname.pipe';
import { SkeletonComponent } from '@engom/common/shared/components/skeleton/skeleton.component';
import { TypedMatCellDirective } from '@engom/common/shared/directives/typed-mat-cell.directive';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

/** Table column. */
enum Column {
	FirstName = 'firstName',
	LastName = 'lastName',
	Actions = 'actions',
}

/** Group students component. */
@Component({
	selector: 'engomw-group-students',
	templateUrl: 'group-students.component.html',
	styleUrl: 'group-students.component.css',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [MatTableModule, FullNamePipe, SkeletonComponent, TypedMatCellDirective, MatIconButton, MatIcon],
})
export class GroupStudentsComponent extends AbstractTableComponent<User, Column> {

	/** @inheritdoc */
	protected override readonly tableColumn = Column;

	/** @inheritdoc */
	public override displayedColumns = enumToArray(Column);

	/** Group. */
	public readonly group = input.required<Group>();
}
