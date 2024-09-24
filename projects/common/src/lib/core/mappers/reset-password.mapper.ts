import { Injectable } from '@angular/core';

import { EntityValidationErrors } from '../models/app-error';
import { PasswordReset } from '../models/password-reset';

import { PasswordResetDto } from '../dtos/password-reset.dto';
import { ValidationErrorDto } from '../dtos/validation-error.dto';

import { extractErrorMessageByErrorKey } from './extract-error-message';
import { MapperToDto, ValidationErrorMapper } from './mappers';

/** Mapper for reset password data. */
@Injectable({ providedIn: 'root' })
export class ResetPasswordMapper
implements
		MapperToDto<PasswordReset.Data, PasswordResetDto.Data>,
		ValidationErrorMapper<PasswordReset.Data, PasswordResetDto.Data> {
	/** @inheritdoc */
	public toDto(model: PasswordResetDto.Data): PasswordReset.Data {
		return {
			email: model.email,
		};
	}

	/** @inheritdoc */
	public validationErrorFromDto(
		errorDto: ValidationErrorDto<PasswordReset.Data>,
	): EntityValidationErrors<PasswordResetDto.Data> {
		return {
			email:
				extractErrorMessageByErrorKey(errorDto, 'email') ??
				extractErrorMessageByErrorKey(errorDto, 'non_field_errors'),
		};
	}
}
