import { TypeOf, z } from 'zod';

/**
 * Creates nodes DTO schema.
 * @param itemSchema Some item schema.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createNodesDtoSchema<T extends z.ZodTypeAny>(
	itemSchema: T,
) {
	return z.object({
		nodes: z.array(itemSchema),
	}).strict();
}

/** Nodes DTO. */
export type NodesDto<T extends z.ZodTypeAny> =
  TypeOf<ReturnType<typeof createNodesDtoSchema<T>>>;
