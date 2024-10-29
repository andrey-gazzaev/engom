import { inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/** Abstract dialog component. */
export abstract class AbstractDialogComponent<TData = void, TResult = void> {
	/** Dialog ref. */
	protected readonly dialogRef: MatDialogRef<typeof this, TResult> = inject(MatDialogRef<typeof this, TResult>);

	/** Dialog data. */
	protected readonly dialogData: TData = inject<TData>(MAT_DIALOG_DATA);

	/** Handles closing a modal window. */
	protected onClose(): void {
		throw new Error('`onClose` method is not implemented');
	}
}
