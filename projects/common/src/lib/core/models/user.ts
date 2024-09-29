import { Group } from './group';
import { UserRole } from './user-role';

/** Basic representation of a user. */
export type User = {

	/** ID. */
	readonly id: number;

	/** First name. */
	readonly firstName: string;

	/** Last name. */
	readonly lastName: string;

	/** Role. */
	readonly role: UserRole;

	/** Groups that the user belong to. */
	readonly groups: readonly Group[];
};
