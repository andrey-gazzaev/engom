import { Injectable } from '@angular/core';

import { UserSecret } from '../models/user-secret';

import { UserSecretDto } from '../dtos/user-secret.dto';

import { Mapper } from './mappers';

/** User secret mapper. */
@Injectable({
	providedIn: 'root',
})
export class UserSecretDataMapper
implements Mapper<UserSecretDto, UserSecret> {
	/** @inheritdoc */
	public toDto(model: UserSecret): UserSecretDto {
		return {
			token: model.token,
		};
	}

	/** @inheritdoc */
	public fromDto(dto: UserSecretDto): UserSecret {
		return {
			token: dto.token,
		};
	}
}
