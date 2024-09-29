import { Injectable } from '@angular/core';

import { Group } from '../models/group';
import { GroupDto } from '../dtos/group.dto';

import { MapperFromDto } from './mappers';

/** Group mapper. */
@Injectable({
	providedIn: 'root',
})
export class GroupMapper implements MapperFromDto<GroupDto, Group> {

	/** @inheritdoc */
	public fromDto(dto: GroupDto): Group {
		return {
			name: dto.name,
			id: dto.id,
		};
	}
}
