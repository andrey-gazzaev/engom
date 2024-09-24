import { z } from 'zod';

/** User DTO schema. */
export const userDtoSchema = z.object({

	/** ID. */
	id: z.number(),

	/** First name. */
	first_name: z.string(),

	/** Last name. */
	last_name: z.string(),
}).strict();

/** User DTO. */
export type UserDto = Readonly<z.infer<typeof userDtoSchema>>;
