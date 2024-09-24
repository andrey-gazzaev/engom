import { z } from 'zod';

const passwordChangeSchema = z.object({

	/** Current password. */
	password: z.string(),

	/** New password. */
	newPassword: z.string(),

	/** New password confirmation. */
	newPasswordConfirmation: z.string(),
}).strict();

/** Password change data. */
export type PasswordChange = Readonly<z.infer<typeof passwordChangeSchema>>;
