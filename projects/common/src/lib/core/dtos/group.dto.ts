import { z } from 'zod';

/** Group DTO schema. */
export const groupDtoSchema = z.object({

	/** ID. */
	id: z.number(),

	/** Name. */
	name: z.string(),
}).strict();

/** Group DTO. */
export type GroupDto = Readonly<z.infer<typeof groupDtoSchema>>;
