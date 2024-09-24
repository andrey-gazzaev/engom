import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { User } from '../models/user';

import { UserMapper } from '../mappers/user.mapper';
import { userDtoSchema } from '../dtos/user.dto';

import { AppUrlsConfig } from './app-urls.config';

/** Performs CRUD operations for users. */
@Injectable({
	providedIn: 'root',
})
export class UserApiService {

	private readonly apiUrls = inject(AppUrlsConfig);

	private readonly httpClient = inject(HttpClient);

	private readonly userMapper = inject(UserMapper);

	/** Returns current user info.*/
	public getCurrentUser(): Observable<User> {
		return this.httpClient.get<unknown>(
			this.apiUrls.user.currentProfile,
		)
			.pipe(
				map(response => userDtoSchema.parse(response)),
				map(userDto => this.userMapper.fromDto(userDto)),
			);
	}
}
