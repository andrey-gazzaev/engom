import { z } from 'zod';

/** User secret DTO schema. */
export const userSecretDtoSchema = z.object({
	data: z.object({
		authenticate: z.object({
			/** Access token. */
			token: z.string().nullable(),
		}),
	}),
}).strict();

/** User secret DTO. */
export type UserSecretDto = Readonly<z.infer<typeof userSecretDtoSchema>>;
