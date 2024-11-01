import { z } from 'zod';

/** Base filter parameters. */
export namespace BaseFilterParams {

	/** Search filters schema. */
	export const searchSchema = z
		.object({
			/** Search filter. */
			search: z.string().optional(),
		})
		.strict();

	/** Pagination filters schema. */
	export const paginationSchema = z
		.object({
			/** Page number filter. */
			pageNumber: z.number().optional(),

			/** Page size filter. */
			pageSize: z.number().optional(),
		})
		.strict();

	/** Search and pagination filters schema. */
	export const baseFilterParamsCombinedSchema = searchSchema.and(paginationSchema);

	/** Search filter. */
	export type Search = Readonly<z.infer<typeof searchSchema>>;

	/** Pagination filters. */
	export type Pagination = Readonly<z.infer<typeof paginationSchema>>;

	/** Search and pagination filters. */
	export type Combined = Readonly<z.infer<typeof baseFilterParamsCombinedSchema>>;

	/** Default page size option. */
	export const DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 25, 50];

	/** Default filter values. */
	export const DEFAULT: Combined = {
		pageNumber: 0,
		pageSize: DEFAULT_PAGE_SIZE_OPTIONS[1],
		search: '',
	};

	/** Filter values for all items. */
	export const ALL_ITEMS: Combined = {
		pageNumber: 0,
		pageSize: 9999,
		search: '',
	};
}
