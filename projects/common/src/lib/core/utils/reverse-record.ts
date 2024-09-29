import { ReadonlyRecord } from './types/readonly-record';

/**
 * Reverse record util.
 * @param record Record to change.
 */
export function reverseRecord<T extends PropertyKey, U extends PropertyKey>(
	record: Record<T, U>,
): ReadonlyRecord<U, T> {
	return Object.fromEntries(Object.entries(record).map(([key, value]) => [value, key]));
}
