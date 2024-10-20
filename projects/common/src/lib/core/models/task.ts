import { Vocabulary } from './vocabulary';

/** Task. */
export type Task = {

	/** ID. */
	readonly id: number;

	/** Description. */
	readonly description: string;

	/** Dictionary. */
	readonly dictionary: readonly Vocabulary[];
};
