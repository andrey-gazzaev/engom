import { Injectable } from '@angular/core';

import { VocabularyDto } from '../dtos/vocabulary.dto';
import { Vocabulary } from '../models/vocabulary';

import { MapperFromDto } from './mappers';

/** Vocabulary mapper. */
@Injectable({ providedIn: 'root' })
export class VocabularyMapper implements MapperFromDto<VocabularyDto, Vocabulary> {

	/** @inheritdoc */
	public fromDto(dto: VocabularyDto): Vocabulary {
		return {
			id: dto.id,
			origin: dto.origin,
			translation: dto.translation,
		};
	}
}
