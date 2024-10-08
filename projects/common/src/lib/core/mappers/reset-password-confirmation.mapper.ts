import { Injectable } from '@angular/core';

import { EntityValidationErrors } from '../models/app-error';
import { PasswordReset } from '../models/password-reset';

import { PasswordResetDto } from '../dtos/password-reset.dto';
import { ValidationErrorDto } from '../dtos/validation-error.dto';

import { extractErrorMessageByErrorKey } from './extract-error-message';
import { MapperToDto, ValidationErrorMapper } from './mappers';

/** Mapper for reset password data. */
@Injectable({ providedIn: 'root' })
export class ResetPasswordConfirmationMapper
implements
		MapperToDto<PasswordResetDto.Confirmation, PasswordReset.Confirmation>,
		ValidationErrorMapper<PasswordResetDto.Confirmation, PasswordReset.Confirmation> {
	/** @inheritdoc */
	public toDto(model: PasswordReset.Confirmation): PasswordResetDto.Confirmation {
		// the key string contains uid + token which is separated by a special symbol
		// example `Mg-asl85g-2bd2acf70e9a300f8e01a5a5f9edef25`, where `Mg` is uid and `asl85g-2bd2acf70e9a300f8e01a5a5f9edef25` is token
		const UID_SEPARATOR = '-';
		const firstSeparatorIndex = model.key.indexOf(UID_SEPARATOR);
		return {
			password: model.password,
			password_confirm: model.passwordConfirmation,
			uid: model.key.slice(0, firstSeparatorIndex),

			// + 1 is to remove the separator from token
			token: model.key.slice(firstSeparatorIndex + 1),
		};
	}

	/** @inheritdoc */
	public validationErrorFromDto(
		errorDto: ValidationErrorDto<PasswordResetDto.Confirmation>,
	): EntityValidationErrors<PasswordReset.Confirmation> {
		return {
			password:
				extractErrorMessageByErrorKey(errorDto, 'password') ??
				extractErrorMessageByErrorKey(errorDto, 'non_field_errors'),
			passwordConfirmation: extractErrorMessageByErrorKey(errorDto, 'password_confirm'),
		};
	}
}
