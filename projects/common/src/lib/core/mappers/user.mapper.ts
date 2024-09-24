import { Injectable } from '@angular/core';

import { User } from '../models/user';
import { UserDto } from '../dtos/user.dto';

import { MapperFromDto } from './mappers';

/** User mapper. */
@Injectable({
	providedIn: 'root',
})
export class UserMapper implements MapperFromDto<UserDto, User> {
	/** @inheritdoc */
	public fromDto(dto: UserDto): User {
		return {
			firstName: dto.first_name,
			lastName: dto.last_name,
			id: dto.id,
		};
	}
}
