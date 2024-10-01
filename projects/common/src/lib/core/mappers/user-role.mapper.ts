import { Injectable } from '@angular/core';

import { UserRoleDto } from '../dtos/user-role.dto';
import { UserRole } from '../models/user-role';
import { reverseRecord } from '../utils/reverse-record';

import { Mapper } from './mappers';

const USER_ROLE_FROM_DTO_MAP: Record<UserRoleDto, UserRole> = {
	ADMIN: 'admin',
	STUDENT: 'student',
	TEACHER: 'teacher',
};

const USER_ROLE_TO_DTO_MAP = reverseRecord(USER_ROLE_FROM_DTO_MAP);

/** User role mapper. */
@Injectable({
	providedIn: 'root',
})
export class UserRoleMapper implements Mapper<UserRoleDto, UserRole> {
	/** @inheritdoc */
	public toDto(model: UserRole): UserRoleDto {
		return USER_ROLE_TO_DTO_MAP[model];
	}

	/** @inheritdoc */
	public fromDto(dto: UserRoleDto): UserRole {
		return USER_ROLE_FROM_DTO_MAP[dto];
	}
}
