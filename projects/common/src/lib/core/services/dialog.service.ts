import { ComponentType } from '@angular/cdk/portal';
import { Injectable, inject } from '@angular/core';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AbstractDialogComponent } from '@engom/common/shared/components/abstract-dialog/abstract-dialog';

import { StrictOmit } from '../utils/types/strict-omit';

type DialogConfig<TData> = StrictOmit<MatDialogConfig, 'data'> & (TData extends void ? {
} : {

	/** Dialog data. */
	readonly data: TData;
});

/** Dialog service. */
@Injectable({ providedIn: 'root' })
export class DialogService {
	private readonly matDialog = inject(MatDialog);

	/**
	 * Opens dialog.
	 * @param dialogComponent Dialog component.
	 * @param config Dialog config.
	 */
	public openDialog<TData, TResult, TComponent>(
		dialogComponent: ComponentType<AbstractDialogComponent<TData, TResult> & TComponent>,
		config: DialogConfig<TData>,
	): MatDialogRef<TComponent, TResult> {
		return this.matDialog.open<TComponent, TData, TResult>(dialogComponent, config);
	}
}
