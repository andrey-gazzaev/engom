import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { User } from '../models/user';

import { UserMapper } from '../mappers/user.mapper';
import { usersDtoSchema } from '../dtos/user.dto';

import { AppUrlsConfig } from './app-urls.config';

/** Performs CRUD operations for users. */
@Injectable({
	providedIn: 'root',
})
export class UsersApiService {
	private readonly apiUrls = inject(AppUrlsConfig);

	private readonly httpClient = inject(HttpClient);

	private readonly userMapper = inject(UserMapper);

	/** Gets users.*/
	public getUsers(): Observable<User[]> {
		const query = `{
			allUsers {
				nodes {
					id
					firstName
					lastName
					role
					groupusersByUserId {
						nodes {
							groupByGroupId {
								id
								name
							}
						}
					}
				}
			}
		}`.trim();

		return this.httpClient.post<unknown>(this.apiUrls.graphiql.zero, { query, operationName: null, variables: null }).pipe(
			map(response => usersDtoSchema.parse(response)),
			map(usersDto => usersDto.data.allUsers.nodes.map(userDto => this.userMapper.fromDto(userDto))),
		);
	}
}
