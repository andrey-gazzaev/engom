import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';

import { LoadingDirective } from './loading.directive';

describe('LoadingDirective', () => {
	let spectator: SpectatorDirective<LoadingDirective>;

	const createSpectator = createDirectiveFactory(LoadingDirective);

	beforeEach(() => {
		spectator = createSpectator(`<div engomcLoading></div>`);
	});

	it('applies loading class on element', () => {
		spectator.setInput('engomcLoading', true);
		expect(spectator.element.classList.contains('engomc-loading')).toBe(true);
	});

	it('removes loading class on element', () => {
		spectator.setInput('engomcLoading', false);
		expect(spectator.element.classList.contains('engomc-loading')).toBe(false);
	});

	it('disables element', () => {
		spectator.setInput('engomcLoading', true);
		expect(spectator.element.hasAttribute('disabled')).toBe(true);
	});

	it('enables element', () => {
		spectator.setInput('engomcLoading', false);
		expect(spectator.element.hasAttribute('disabled')).toBe(false);
	});
});
