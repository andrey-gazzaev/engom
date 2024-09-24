import { HttpErrorResponse } from '@angular/common/http';

import { NoneFieldErrorKey } from '../mappers/extract-error-message';
import { MaxErrorDepth, ObjectPaths } from '../utils/types/object-paths';

/**
 * Error types related to response error status.
 * @see {@link [Client Errors](https://drf-standardized-errors.readthedocs.io/en/latest/error_response.html#client-errors)}.
 */
type ApiErrorType =
	| 'parse_error'
	| 'authentication_failed'
	| 'not_authenticated'
	| 'permission_denied'
	| 'not_found'
	| 'method_not_allowed'
	| 'not_acceptable'
	| 'unsupported_media_type'
	| 'throttled'
	| 'server_error'
	| 'validation_error';

/** Error returned by API. */
export type ApiErrorDto<TDto> = {

	/**
	 * Error code.
	 * TODO (Template): The field may not exist.
	 */
	readonly code: string;

	/** Error description.  */
	readonly detail: string;

	/**
	 * Key of error. The form field for which the error occurred.
	 * @example What the error key might look like.
	 * `form.field` or `form.1` or `form.filed1.field2`.
	 *
	 * @todo (Template): The name of the field may be different from the current one.
	 */
	readonly attr: ObjectPaths<TDto, MaxErrorDepth> | NoneFieldErrorKey;
};

/** Validation error DTO. */
export type ValidationErrorDto<T> = {

	/** Error type. */
	readonly type: ApiErrorType;

	/** Errors. */
	readonly errors: readonly ApiErrorDto<T>[];
};

/**
 * Is error a ValidationErrorDto.
 * @param error Some error.
 */
export function isValidationErrorDto<T>(error: HttpErrorResponse['error']): error is ValidationErrorDto<T> {
	return (error as ValidationErrorDto<T>).type != null && (error as ValidationErrorDto<T>).errors != null;
}
