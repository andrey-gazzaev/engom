import { z } from 'zod';

import { userRolesDto } from './user-role.dto';
import { groupDtoSchema } from './group.dto';
import { createNodesDtoSchema } from './nodes.dto';

/** User DTO schema. */
export const userDtoSchema = z
	.object({
		/** ID. */
		id: z.number(),

		/** First name. */
		firstName: z.string(),

		/** Last name. */
		lastName: z.string(),

		/** Email. */
		email: z.string(),

		/** Role. */
		role: z.enum(userRolesDto),

		groupusersByUserId: createNodesDtoSchema(z.object({ groupByGroupId: groupDtoSchema })),

		createdDate: z.string(),
	})
	.strict();

/** User DTO. */
export type UserDto = Readonly<z.infer<typeof userDtoSchema>>;

/** Users DTO schema. */
export const usersDtoSchema = z.object({
	data: z.object({
		allUsers: createNodesDtoSchema(userDtoSchema),
	}),
});

/** Users DTO. */
export type UsersDto = Readonly<z.infer<typeof usersDtoSchema>>;
