import { z } from 'zod';

/** Password reset data schema. */
export const passwordResetDataSchema = z.object({

	/** Email to sent link for reset password. */
	email: z.string(),
}).strict();

/** Password reset confirmation schema. */
export const passwordResetConfirmationSchema = z.object({

	/** Password. */
	password: z.string(),

	/** Password confirmation. */
	passwordConfirmation: z.string(),

	/** Public token for changing the password. */
	key: z.string(),
}).strict();

/** Authorization data. */
export namespace PasswordReset {

	/** Data required to restore the password. */
	export type Data = Readonly<z.infer<typeof passwordResetDataSchema>>;

	/** Reset password confirmation data. */
	export type Confirmation = Readonly<z.infer<typeof passwordResetConfirmationSchema>>;
}
