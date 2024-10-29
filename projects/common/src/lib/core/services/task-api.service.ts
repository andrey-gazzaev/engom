import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';

import { User } from '../models/user';
import { Task } from '../models/task';
import { groupTasksDtoSchema, tasksByUserIdDtoSchema } from '../dtos/task';
import { UserTask } from '../models/user-task';
import { UserTaskMapper } from '../mappers/user-task.mapper';

import { TaskMapper } from '../mappers/task.mapper';

import { Group } from '../models/group';

import { AppUrlsConfig } from './app-urls.config';

/** Task API service. */
@Injectable({ providedIn: 'root' })
export class TaskApiService {
	private readonly apiUrls = inject(AppUrlsConfig);

	private readonly httpClient = inject(HttpClient);

	private readonly userTaskMapper = inject(UserTaskMapper);

	private readonly taskMapper = inject(TaskMapper);

	/**
	 * Gets tasks for the specified group.
	 * @param group Group whose tasks are to be received.
	 */
	public getGroupTasks(group: Group): Observable<Task[]> {
		const query = `{
			allGrouptasks(condition: { groupId: ${group.id} }) {
				nodes {
					taskByTaskId {
						vocabularytasksByTaskId {
							nodes {
								vocabularyByVocabularyId {
									translation
									origin
									id
								}
							}
						}
						description
						id
					}
				}
			}
		}`;

		return this.httpClient
			.post<unknown>(this.apiUrls.graphiql.zero, {
			query,
		})
			.pipe(
				map(response => groupTasksDtoSchema.parse(response)),
				map(tasksDto =>
					tasksDto.data.allGrouptasks.nodes.flatMap(taskDto => this.taskMapper.fromDto(taskDto.taskByTaskId))),
			);
	}

	/**
	 * Gets all available tasks for the specified group.
	 * @param group Group whose available tasks are to be received.
	 */
	public getAvailableGroupTasks(group: Group): Observable<Task[]> {
		const query = `{
			allGrouptasks(filter: {groupId: {notEqualTo: ${group.id}}}) {
				nodes {
					taskByTaskId {
						vocabularytasksByTaskId {
							nodes {
								vocabularyByVocabularyId {
									translation
									origin
									id
								}
							}
						}
						description
						id
					}
				}
			}
		}`;

		return this.httpClient
			.post<unknown>(this.apiUrls.graphiql.zero, {
			query,
		})
			.pipe(
				map(response => groupTasksDtoSchema.parse(response)),
				map(tasksDto =>
					tasksDto.data.allGrouptasks.nodes.flatMap(taskDto => this.taskMapper.fromDto(taskDto.taskByTaskId))),
			);
	}

	/**
	 * Gets tasks of the specified user.
	 * @param userId User ID by which tasks will be got.
	 */
	public getUserTasksByUserId(userId: User['id']): Observable<UserTask[]> {
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
								this.userTaskMapper.fromDto({ ...taskDto.taskByTaskId, completedAt: taskDto.completedat })))
						.flat()),
			);
	}

	/**
	 * Assigns a task to the specified group.
	 * @param task The task to be assigned to the group.
	 * @param group The group to be assigned a task.
	 */
	public assignTaskToGroup(task: Task, group: Group): Observable<void> {
		const mutation = `mutation {
			createGrouptask(input: {grouptask: {taskId: ${task.id}, groupId: ${group.id}}})
		}`;

		return this.httpClient
			.post<unknown>(this.apiUrls.graphiql.zero, {
			query: mutation,
		})
			.pipe(map(() => undefined));
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
