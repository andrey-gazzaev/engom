/** Needed to limit the depth of a nested object. */
type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
	11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ...0[]];

/**
 * Utility that creates strings through a dot.
 * For example: `Join<'key1', 'key2'>` to `'key1.key2'`.
 */
type Join<K, P> = K extends string | number ?
	P extends string | number ?
  `${K}${'' extends P ? '' : '.'}${P}`
		: never : never;

/** Max error depth. */
export type MaxErrorDepth = 3;

/**
 * Recursively find all keys of an object.
 * For example we have nested object:
 * `
 *  {
 *    a: number,
 *    b: {
 *      c: string
 *    }
 *  }
 * `
 * The utility will return the union: `a | b | b.c`.
 */
export type ObjectPaths<T, D extends number = MaxErrorDepth> = [D] extends [never] ? never : T extends object ?
	{ [K in keyof T]?: K extends string | number ?
    `${K}` | Join<K, ObjectPaths<T[K], Prev[D]>>
		: never
	}[keyof T] : '';

/* eslint-disable jsdoc/require-jsdoc */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Test = ObjectPaths<{
	a: number;
	b: {
		c: string;
		v: {
			t: string;
		}[];
	};
}>;

// Expect "a" | "b" | "b.c" | "b.v" | `b.v.${number}` | `b.v.${number}.t` | undefined
