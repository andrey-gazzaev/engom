import { Task } from './task';

export type UserTask = Task & {

	/** Is completed. */
	readonly isCompleted: boolean;
};
