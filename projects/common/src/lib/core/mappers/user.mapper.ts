import { inject, Injectable } from '@angular/core';

import { User } from '../models/user';
import { UserDto } from '../dtos/user.dto';

import { MapperFromDto } from './mappers';
import { UserRoleMapper } from './user-role.mapper';
import { GroupMapper } from './group.mapper';

/** User mapper. */
@Injectable({
	providedIn: 'root',
})
export class UserMapper implements MapperFromDto<UserDto, User> {

	private readonly userRoleMapper = inject(UserRoleMapper);

	private readonly groupMapper = inject(GroupMapper);

	/** @inheritdoc */
	public fromDto(dto: UserDto): User {
		return {
			firstName: dto.firstName,
			lastName: dto.lastName,
			id: dto.id,
			role: this.userRoleMapper.fromDto(dto.role),
			groups: dto.groupsByUserId.nodes.map(group => this.groupMapper.fromDto(group)),
		};
	}
}
