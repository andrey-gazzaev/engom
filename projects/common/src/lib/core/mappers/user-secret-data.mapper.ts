import { Injectable } from '@angular/core';

import { UserSecret } from '../models/user-secret';

import { UserSecretDto } from '../dtos/user-secret.dto';

import { MapperFromDto } from './mappers';

/** User secret mapper. */
@Injectable({
	providedIn: 'root',
})
export class UserSecretDataMapper
implements MapperFromDto<UserSecretDto, UserSecret> {

	/** @inheritdoc */
	public fromDto(dto: UserSecretDto): UserSecret {
		return {
			token: dto.data.authenticate.token,
		};
	}
}
