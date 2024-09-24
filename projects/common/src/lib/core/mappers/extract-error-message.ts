
import { ApiErrorDto, ValidationErrorDto } from '../dtos/validation-error.dto';
import { MaxErrorDepth, ObjectPaths } from '../utils/types/object-paths';

/** None field error key. */
export type NoneFieldErrorKey = 'non_field_errors';

/** Parsed error key. */
type ParsedErrorKey = {

	/** Last key segment. */
	readonly lastSegment: string | undefined;
};

type Options = {

	/**
	 * Is an exact match algorithm used or only the first match.
	 * @description If the value is set to true,
	 * then the specified key will be used as a strict value,
	 * this can be useful if the error contains keys that are the beginning of other keys.
	 * @example
	 * If you want to extract an error by the `user` key
	 * and you have the `userAddress` key, then you need to set the value to true.
	 * extractErrorMessageByErrorKey('user', { isExactMatch: true });
	 */
	readonly isExactMatch: boolean;
};

const DEFAULT_OPTIONS: Options = {
	isExactMatch: false,
};

/**
 * Parses API error DTO key.
 * @param apiErrorDto An error whose key will be parsed.
 * @param errorKey Error key based on which parsing will take place.
 */
function parseErrorKey<T>(
	apiErrorDto: ApiErrorDto<T>,
	errorKey: ObjectPaths<T, MaxErrorDepth> | NoneFieldErrorKey,
): ParsedErrorKey {
	const attrSegments = String(apiErrorDto.attr)
		.replace(`${String(errorKey)}`, '')
		.split('.');
	return {
		lastSegment: attrSegments.at(-1),
	};
}

/**
 * Checks what type of errors the error belongs to, an array or a single one.
 * @description If the error key ends with a number, the error is on the error array.
 * @example
 * 	recipients.1 -> for array
 * 	recipients.1.name -> for array
 * 	recipients.name -> for single field
 * @param errors Errors.
 * @param errorKey Error key.
 */
function isArrayError<T>(
	errors: readonly ApiErrorDto<T>[],
	errorKey: ObjectPaths<T, MaxErrorDepth> | NoneFieldErrorKey,
): boolean {
	return errors.every(error => {
		const { lastSegment: arrayIndex } = parseErrorKey(error, errorKey);
		return arrayIndex !== '' && !isNaN(Number(arrayIndex));
	});
}

/**
 * Extracts only one error format.
 * @description Works with keys only in the format `errorKey.0`, `errorKey.1`, etc.
 * @example
 * const errors = [
 *		{
 *			"code": "required",
 *			"detail": "This field is required.",
 *			"attr": "recipients.1"
 *		},
 *		{
 *			"code": "invalid",
 *			"detail": "Enter a valid email address.",
 *			"attr": "recipients.2"
 *		}
 *	];
 * extractErrorMessageFromArray(errors, 'recipients');
 *	// Expect
 *	//	[
 *	//		[1]: "This field is required.",
 *	//		[2]: "Enter a valid email address.",
 *	//	];
 * @param apiErrorDtos Errors from which the error text will be extracted.
 * @param errorKey The error key by which the error text will be extracted from the specified errors.
 * @returns String array, where the array index matches the last digit in the error key.
 */
function extractErrorMessageFromArray<T>(
	apiErrorDtos: readonly ApiErrorDto<T>[],
	errorKey: ObjectPaths<T, MaxErrorDepth> | NoneFieldErrorKey,
): string[] {
	const errorsMessages: string[] = [];
	apiErrorDtos.forEach(error => {
		const { lastSegment: arrayIndex } = parseErrorKey(error, errorKey);

		if (!isNaN(Number(arrayIndex))) {
			errorsMessages[Number(arrayIndex)] = error.detail;
		}
	});

	return errorsMessages;
}

/**
 * Extracts an error message from specified the validation error DTO by the specified error key.
 * @example
 *
 * const errors = {
 *		type: 'invalid';
 *		errors: [{
 *			"code": "required",
 *			"detail": "This field is required.",
 *			"attr": "recipients.0.name"
 *		}]
 * };
 * extractErrorMessageByErrorKey(errors, 'recipients');
 *	// Expect
 *	// "This field is required."
 * @param validationErrorDto Error from which an error message will be extracted.
 * @param errorKey The error key by which an error message will be extracted from the specified error.
 * @param options Options.
 */
export function extractErrorMessageByErrorKey<T>(
	validationErrorDto: ValidationErrorDto<T>,
	errorKey: ObjectPaths<T, MaxErrorDepth> | NoneFieldErrorKey,
	options: Options = DEFAULT_OPTIONS,
): string | string[] | undefined {
	const { errors } = validationErrorDto;
	const errorsByKey = options.isExactMatch ?
		errors.filter(error => error.attr === errorKey) :
		errors.filter(error => String(error.attr).startsWith(String(errorKey)));

	if (errorsByKey.length === 0) {
		return undefined;
	}

	if (!isArrayError(errorsByKey, errorKey)) {
		return errorsByKey[0].detail;
	}

	return extractErrorMessageFromArray(errorsByKey, errorKey);
}
