import { z } from 'zod';

const passwordChangeDtoSchema = z.object({

	/** Old password. */
	old_password: z.string(),

	/** New password. */
	new_password: z.string(),

	/** Password that should duplicate new password. */
	new_password_confirm: z.string(),
}).strict()
	.refine(data => data.new_password === data.new_password_confirm, {
		message: 'Passwords do not match',
		path: ['new_password_confirm'],
	});

/** Change password DTO. */
export type PasswordChangeDto = Readonly<z.infer<typeof passwordChangeDtoSchema>>;
