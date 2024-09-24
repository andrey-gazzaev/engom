import { fakeAsync, flush } from '@angular/core/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { createObserverSpy } from '@engom/common/testing/utils';
import { Subscription } from 'rxjs';
import { z } from 'zod';

import { StorageService } from './storage.service';

describe('StorageService', () => {
	let spectator: SpectatorService<StorageService>;
	let subs: Subscription[];

	const createService = createServiceFactory({
		service: StorageService,
	});

	beforeEach(() => {
		spectator = createService();
		subs = [];
	});

	afterAll(() => {
		localStorage.clear();
		subs.forEach(sub => sub.unsubscribe());
	});

	describe('.get(x)', () => {
		it('re-emits value in case it\'s changed', fakeAsync(() => {
			const key = 'some-test-key';
			const firstData = { someData: 123 };
			const firstDataSchema = z.object({ someData: z.number() });
			const secondData = { someData: 12345 };
			const resultValues: unknown[] = [];

			spectator.service.save(key, firstData).subscribe();
			subs.push(spectator.service.get(key, firstDataSchema).subscribe(value => resultValues.push(value)));
			spectator.service.save(key, secondData).subscribe();
			flush();

			expect(resultValues.length).toBe(2);
			expect(resultValues).toContain(firstData);
			expect(resultValues).toContain(secondData);
		}));

		it('returns initial null in case storage is empty', () => {
			const key = 'some-non-existent-key';
			const someSchema = z.object({ someKey: z.string() });
			const observerSpy = createObserverSpy();

			subs.push(spectator.service.get(key, someSchema).subscribe(observerSpy));

			expect(observerSpy.next).toHaveBeenCalledOnceWith(null);
			expect(observerSpy.complete).not.toHaveBeenCalled();
			expect(observerSpy.error).not.toHaveBeenCalled();
		});
	});

	describe('.save(x)', () => {
		it('saves to storage', fakeAsync(() => {
			const key = 'some-test-key-1';
			const data = { someData: 123 };
			const dataSchema = z.object({ someData: z.number() });
			let state = null;

			subs.push(spectator.service.get(key, dataSchema).subscribe(value => (state = value)));
			flush();
			expect(state).toBeNull();

			spectator.service.save(key, data).subscribe();
			flush();
			expect(state as (typeof data | null)).toEqual(data);
		}));
	});

	describe('.remove(x)', () => {
		it('removes from storage', fakeAsync(() => {
			const key = 'some-test-key-2';
			const data = { someData: 123 };
			const dataSchema = z.object({ someData: z.number() });
			let state = null;

			subs.push(spectator.service.get(key, dataSchema).subscribe(value => (state = value)));
			flush();
			expect(state).toBeNull();

			spectator.service.save(key, data).subscribe();
			flush();
			expect(state).not.toBeNull();

			spectator.service.remove(key).subscribe();
			flush();
			expect(state).toBeNull();
		}));
	});
});
