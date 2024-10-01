import { z } from 'zod';

/** Vocabulary DTO schema. */
export const vocabularyDtoSchema = z.object({
	/** ID. */
	id: z.number(),

	/** Origin. */
	origin: z.string(),

	/** Translation. */
	translation: z.string(),
}).strict();

/** Vocabulary DTO. */
export type VocabularyDto = Readonly<z.infer<typeof vocabularyDtoSchema>>;
