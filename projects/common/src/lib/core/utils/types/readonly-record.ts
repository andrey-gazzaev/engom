/** Type representing an object with keys of type K and values of type T, where all properties are read-only. */
export type ReadonlyRecord<K extends string | number | symbol, T> = Readonly<Record<K, T>>;
