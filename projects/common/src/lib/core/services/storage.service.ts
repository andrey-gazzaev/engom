import { z } from 'zod';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject, defer, filter, fromEvent, map, merge, of, shareReplay, startWith } from 'rxjs';

import { WINDOW } from '../utils/window-token';

/**
 * Storage service. Uses `localStorage` underhood.
 */
@Injectable({
	providedIn: 'root',
})
export class StorageService {

	/** Emits the key of the changed value. */
	private readonly valueChangedSubject = new Subject<string>();

	private readonly localStorage: Storage;

	private readonly window = inject(WINDOW);

	public constructor() {
		this.localStorage = this.window.localStorage;
	}

	/**
	 * Save data to storage.
	 * @param key Key.
	 * @param data Data for save.
	 */
	public save<T>(key: string, data: T): Observable<void> {
		return defer(() => {
			this.localStorage.setItem(key, JSON.stringify(data));
			this.valueChangedSubject.next(key);

			return of(undefined);
		});
	}

	/**
	 * Get item from storage by key.
	 * @param key Key.
	 * @param schema Schema to parse unsafe data from the local storage.
	 */
	public get<T extends z.ZodType<object>>(key: string, schema: T): Observable<z.infer<typeof schema> | null> {
		return this.watchStorageChangeByKey(key).pipe(
			map(() => this.obtainFromStorageByKey<T>(key, schema)),
			startWith(this.obtainFromStorageByKey<T>(key, schema)),
			shareReplay({ refCount: true, bufferSize: 1 }),
		);
	}

	private watchStorageChangeByKey(keyToWatch: string): Observable<void> {
		const otherPageChange$ = fromEvent(this.window, 'storage').pipe(
			filter((event): event is StorageEvent => event instanceof StorageEvent),
			map(event => event.key),
		);

		// storage event happens only for the other pages of this domain, so we need to handle the local changes manually
		// https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event
		const currentPageChange$ = this.valueChangedSubject;

		return merge(
			otherPageChange$,
			currentPageChange$,
		).pipe(
			filter(key => key === keyToWatch),
			map(() => undefined),
		);
	}

	private obtainFromStorageByKey<T extends z.ZodType<object>>(key: string, schema: T): z.infer<typeof schema> | null {
		const rawData = this.localStorage.getItem(key);
		if (rawData == null) {
			return null;
		}

		const maybeData = JSON.parse(rawData);
		return schema.parse(maybeData);
	}

	/**
	 * Removed data from storage.
	 * @param key Key.
	 */
	public remove(key: string): Observable<void> {
		return defer(() => {
			this.localStorage.removeItem(key);
			this.valueChangedSubject.next(key);

			return of(undefined);
		});
	}
}
