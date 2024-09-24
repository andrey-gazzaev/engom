import { FormArray, FormControl, FormGroup, UntypedFormGroup } from '@angular/forms';
import {
	Observable,
	OperatorFunction,
	Subject,
} from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AppError, AppValidationError, EntityValidationErrors } from '../../models/app-error';
import { AppValidators } from '../validators';

/**
 * Util operator function to catch `AppValidationError` on presentational logic.
 * @param formOrSubject Subject to emit data if it was there.
 */
export function catchValidationData<T, R>(
	formOrSubject: Subject<EntityValidationErrors<T>> | FormGroup,
): OperatorFunction<R, R | never> {
	return source$ =>
		source$.pipe(
			catchValidationError(({ validationData, message }) => {
				if (formOrSubject instanceof UntypedFormGroup) {
					fillFormWithError(formOrSubject, validationData);
				} else {
					formOrSubject.next(validationData);
				}

				throw new AppError(message);
			}),
		);
}

/**
 * Fill the form with error data.
 * @param form Form to fill.
 * @param errors Array of errors.
 */
function fillFormWithError<T>(form: FormGroup, errors: EntityValidationErrors<T>): void {
	const controlKeys = Object.keys(form.controls) as (keyof T)[];
	controlKeys.forEach(key => {
		const error = errors[key];
		const control = form.controls[key as string];
		if (error != null && control != null) {
			if (control instanceof FormArray) {
				fillFormArrayWithError(control, error as EntityValidationErrors<T[keyof T]>);
			}

			if (!(control instanceof FormArray) && Array.isArray(error)) {
				control.setErrors(AppValidators.buildAppError(error[0]));
			}

			// If error is not nested
			if (typeof error === 'string') {
				control.setErrors(AppValidators.buildAppError(error));
			} else if (control instanceof FormGroup && typeof error === 'object') {
				// Since we checked the error type, help typescript with error typing
				fillFormWithError(control, error as EntityValidationErrors<T[keyof T]>);
			}
		}
	});
}

/**
 * Fill the form array with error data.
 * @param formArray Form array to fill.
 * @param errors Array of errors.
 */
function fillFormArrayWithError<T>(formArray: FormArray, errors: EntityValidationErrors<T>): void {
	const controlKeys = Object.keys(formArray.controls) as (keyof T)[];
	controlKeys.forEach(key => {
		const error = errors[key];
		const control = formArray.controls[key as number];
		if (error && control) {
			if (control instanceof FormControl && typeof error === 'string') {
				control.setErrors(AppValidators.buildAppError(error));
			}

			if (control instanceof FormGroup) {
				fillFormWithError(control, error as EntityValidationErrors<T[keyof T]>);
			}
		}
	});
}

/**
 * Catch application validation error (instance of AppValidationError) operator.
 * Catches only AppValidationError<T> errors.
 * @param selector Selector.
 */
export function catchValidationError<T, R>(
	selector: (error: AppValidationError<Record<string, unknown>>) => Observable<R>,
): OperatorFunction<T, T | R> {
	return catchError((error: unknown) => {
		if (error instanceof AppValidationError) {
			return selector(error);
		}
		throw error;
	});
}
