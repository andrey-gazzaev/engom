import { z } from 'zod';

/** User secret DTO schema. */
export const userSecretDtoSchema = z.object({

	/** Access token. */
	token: z.string(),
}).strict();

/** User secret DTO. */
export type UserSecretDto = Readonly<z.infer<typeof userSecretDtoSchema>>;
