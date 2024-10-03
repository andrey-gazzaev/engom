import { z } from 'zod';

/** User secret schema. */
export const userSecretSchema = z.object({

	/** Access token. */
	token: z.string().nullable(),
}).strict();

/** User secret. */
export type UserSecret = Readonly<z.infer<typeof userSecretSchema>>;
