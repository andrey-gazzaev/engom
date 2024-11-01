/* eslint-disable rxjs/finnish */
/* eslint-disable @angular-eslint/directive-selector */
import { CdkCellDef } from '@angular/cdk/table';
import { Directive, Input } from '@angular/core';
import { MatCellDef, MatTableDataSource } from '@angular/material/table';
import { Pagination } from '@engom/common/core/models/pagination';
import { Observable } from 'rxjs';

/** Typed mat cell directive. */
@Directive({
	selector: '[matCellDef]',
	providers: [{ provide: CdkCellDef, useExisting: TypedMatCellDirective }],
	standalone: true,
})
export class TypedMatCellDirective<T> extends MatCellDef {

	/** Leveraging syntactic-sugar syntax when we use *matCellDef. */
	@Input()
	public matCellDefDataSource?: readonly T[] | T[] | Observable<T[]> | MatTableDataSource<T> | Observable<Pagination<T>> | Pagination<T>;

	/**
	 * NgTemplateContextGuard flag to help with the Language Service.
	 * @param dir Directive.
	 * @param ctx Context.
	 */
	public static ngTemplateContextGuard<T>(
		dir: TypedMatCellDirective<T>,
		ctx: unknown,
	): ctx is { $implicit: T; index: number; } {
		return true;
	}
}
