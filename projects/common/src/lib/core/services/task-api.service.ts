import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';

import { User } from '../models/user';
import { Task } from '../models/task';

import { tasksByUserIdDtoSchema } from '../dtos/task';
import { TaskMapper } from '../mappers/task.mapper';

import { AppUrlsConfig } from './app-urls.config';

/** Task API service. */
@Injectable({ providedIn: 'root' })
export class TaskApiService {
	private readonly apiUrls = inject(AppUrlsConfig);

	private readonly httpClient = inject(HttpClient);

	private readonly taskMapper = inject(TaskMapper);

	/**
	 * Gets tasks of the specified user.
	 * @param userId User ID by which tasks will be got.
	 */
	public getTasksByUserId(userId: User['id']): Observable<Task[]> {
		const query = `{
			allUsers(condition: {id: ${userId}}) {
				nodes {
					usertasksByUserId {
						nodes {
							completedat
							taskByTaskId {
								description
								id
								vocabularytasksByTaskId {
									nodes {
										vocabularyByVocabularyId {
											origin
											translation
											id
										}
									}
								}
							}
						}
					}
				}
			}
		}`;

		return this.httpClient
			.post<unknown>(this.apiUrls.graphiql.zero, {
			query,
		})
			.pipe(
				map(response => tasksByUserIdDtoSchema.parse(response)),
				map(usersDto =>
					usersDto.data.allUsers.nodes
						.map(userDto =>
							userDto.usertasksByUserId.nodes.map(taskDto =>
								this.taskMapper.fromDto({ ...taskDto.taskByTaskId, completedAt: taskDto.completedat })))
						.flat()),
			);
	}

	/**
	 * Completes user's task by task Id.
	 * @param userId ID of the user who owns the task.
	 * @param taskId ID of the task to be completed.
	 */
	public completeTask(userId: User['id'], taskId: Task['id']): Observable<void> {
		const mutation = `mutation {
			completedTask(input: {taskId: ${taskId}, userId: ${userId}}) {
				clientMutationId
			}
		}`;

		return this.httpClient
			.post<unknown>(this.apiUrls.graphiql.zero, {
			query: mutation,
		})
			.pipe(map(() => undefined));
	}

	/**
	 * Uncompletes user's task by task Id.
	 * @param userId ID of the user who owns the task.
	 * @param taskId ID of the task to be uncompleted.
	 */
	public uncompleteTask(userId: User['id'], taskId: Task['id']): Observable<void> {
		const mutation = `mutation {
			uncompletedTask(input: {taskId: ${taskId}, userId: ${userId}}) {
				clientMutationId
			}
		}`;

		return this.httpClient
			.post<unknown>(this.apiUrls.graphiql.zero, {
			query: mutation,
		})
			.pipe(map(() => undefined));
	}
}
