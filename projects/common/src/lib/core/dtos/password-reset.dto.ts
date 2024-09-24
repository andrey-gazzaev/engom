import { z } from 'zod';

const passwordResetDataDtoSchema = z.object({

	/** Email to sent link for reset password. */
	email: z.string(),
}).strict();

const passwordResetConfirmationDtoSchema = z.object({

	/** Password. */
	password: z.string(),

	/** Password confirmation. */
	password_confirm: z.string(),

	/** Unique user ID. */
	uid: z.string(),

	/** Public token for changing the password. */
	token: z.string(),
}).strict();

export namespace PasswordResetDto {

	/** Data required to restore the password. */
	export type Data = Readonly<z.infer<typeof passwordResetDataDtoSchema>>;

	/** Reset password confirmation dto. */
	export type Confirmation = Readonly<z.infer<typeof passwordResetConfirmationDtoSchema>>;
}
