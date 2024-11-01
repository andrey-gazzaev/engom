import { Pagination } from '../models/pagination';

/**
 * Create skeletons view on the first load of table when page is loading.
 * @param pageSize Page size.
 */
export function createFirstLoadSkeletonsTable<T>(pageSize: number): Pagination<T> {
	const items = [...Array(pageSize)].fill({});
	return { hasNext: false, hasPrev: false, totalCount: pageSize, items };
}
