/** Pagination. */
export type Pagination<T> = {

	/** Whether the pagination have next pages. */
	readonly hasNext: boolean;

	/**  Whether the pagination have prev pages.  */
	readonly hasPrev: boolean;

	/** Total count in the store. */
	readonly totalCount: number;

	/** Items on the page. */
	readonly items: readonly T[];
};
