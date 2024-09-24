import { z } from 'zod';

/** Data required for login. */
const loginDtoSchema = z.object({

	/** Email. */
	email: z.string(),

	/** Password. */
	password: z.string(),
}).strict();

/** Data required for login. */
export type LoginDto = Readonly<z.infer<typeof loginDtoSchema>>;
