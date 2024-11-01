import { Component, computed, input } from '@angular/core';
import { BaseFilterParams } from '@engom/common/core/models/base-filter-params';
import { createFirstLoadSkeletonsTable } from '@engom/common/core/utils/create-first-load-skeleton';
import { createTrackByFunction, ObjectWithId } from '@engom/common/core/utils/trackby';

/** Abstract table component. */
@Component({ template: '' })
export abstract class AbstractTableComponent<TItem, TColumn> {
	/** Table items. */
	public readonly items = input<readonly TItem[] | null>();

	/** Is table items loading. */
	public readonly isLoading = input<boolean | null>();

	/** Skeletons count. */
	public readonly skeletonsCount = input<number | null>();

	/** Table column. */
	protected readonly tableColumn!: Readonly<Record<string, TColumn>>;

	/** Displayed columns. */
	protected displayedColumns!: readonly TColumn[];

	/** Tracks by list. */
	protected readonly trackById = createTrackByFunction<ObjectWithId>('id');

	/** Skeleton list. */
	protected readonly skeletonList = computed(
		() =>
			createFirstLoadSkeletonsTable<TItem>(this.skeletonsCount() ?? BaseFilterParams.DEFAULT_PAGE_SIZE_OPTIONS[0])
				.items,
	);

	/** Is skeleton show. */
	protected isSkeletonShow(): boolean {
		return this.items() == null || this.isLoading() === true;
	}

	/** Gets table items. */
	protected getItems(): readonly TItem[] {
		const items = this.items();
		if (items == null || this.isLoading() === true) {
			return this.skeletonList();
		}
		return items;
	}

}
