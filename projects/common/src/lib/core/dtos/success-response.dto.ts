import { z } from 'zod';

/** Success response DTO schema. */
export const successResponseDtoSchema = z.object({

	/** Human-readable notification that an operation was successful. */
	detail: z.string(),
}).strict();

/** Represents an information about a successful operation. */
export type SuccessResponseDto = Readonly<z.infer<typeof successResponseDtoSchema>>;
