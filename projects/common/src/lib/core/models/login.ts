import { z } from 'zod';

/** Login schema. */
export const loginSchema = z.object({

	/** Email. */
	email: z.string(),

	/** Password. */
	password: z.string(),
}).strict();

/** Data required for login. */
export type Login = Readonly<z.infer<typeof loginSchema>>;
