import { z } from 'zod';

import { createNodesDtoSchema } from './nodes.dto';
import { vocabularyDtoSchema } from './vocabulary.dto';

/** Task DTO schema. */
export const taskDtoSchema = z
	.object({
		/** ID. */
		id: z.number(),

		/** Description. */
		description: z.string(),

		/** Translation. */
		vocabularytasksByTaskId: createNodesDtoSchema(z.object({ vocabularyByVocabularyId: vocabularyDtoSchema })),
	})
	.strict();

/** Task DTO. */
export type TaskDto = Readonly<z.infer<typeof taskDtoSchema>>;

/** Tasks by user ID DTO schema. */
export const tasksByUserIdDtoSchema = z.object({
	data: z.object({
		allUsers: createNodesDtoSchema(
			z.object({
				usertasksByUserId: createNodesDtoSchema(
					z.object({
						taskByTaskId: taskDtoSchema,

						/** Completed at. */
						completedat: z.string().nullable(),
					}),
				),
			}),
		),
	}),
});

/** Tasks by user ID DTO. */
export type TasksByUserIdDto = Readonly<z.infer<typeof tasksByUserIdDtoSchema>>;
