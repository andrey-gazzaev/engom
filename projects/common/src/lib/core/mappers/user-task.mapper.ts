import { inject, Injectable } from '@angular/core';

import { TaskDto } from '../dtos/task';
import { UserTask } from '../models/user-task';

import { MapperFromDto } from './mappers';
import { TaskMapper } from './task.mapper';

/** User task mapper. */
@Injectable({ providedIn: 'root' })
export class UserTaskMapper implements MapperFromDto<TaskDto & { completedAt: string | null;}, UserTask> {

	private readonly taskMapper = inject(TaskMapper);

	/** @implements */
	public fromDto(dto: TaskDto & { completedAt: string | null; }): UserTask {
		return {
			...this.taskMapper.fromDto(dto),
			isCompleted: dto.completedAt != null,
		};
	}
}
