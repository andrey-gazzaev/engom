import { z } from 'zod';

const userSchema = z.object({

	/** ID. */
	id: z.number(),

	/** First name. */
	firstName: z.string(),

	/** Last name. */
	lastName: z.string(),
}).strict();

/** Basic representation of a user. */
export type User = Readonly<z.infer<typeof userSchema>>;
