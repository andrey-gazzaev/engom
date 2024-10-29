import { inject, Injectable } from '@angular/core';

import { TaskDto } from '../dtos/task';
import { Task } from '../models/task';

import { MapperFromDto } from './mappers';
import { VocabularyMapper } from './vocabulary.mapper';

/** Task mapper. */
@Injectable({ providedIn: 'root' })
export class TaskMapper implements MapperFromDto<TaskDto, Task> {
	private readonly vocabularyMapper = inject(VocabularyMapper);

	/** @implements */
	public fromDto(dto: TaskDto): Task {
		return {
			id: dto.id,
			description: dto.description,
			dictionary: dto.vocabularytasksByTaskId.nodes.map(vocabulary =>
				this.vocabularyMapper.fromDto(vocabulary.vocabularyByVocabularyId)),
		};
	}
}
