import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator';
import { UserService } from '@engom/common/core/services/user.service';
import { NEVER } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
	let spectator: Spectator<DashboardComponent>;

	const createSpectator = createComponentFactory({
		component: DashboardComponent,
		providers: [
			mockProvider(UserService, {
				currentUser$: NEVER,
			}),
		],
		mocks: [ActivatedRoute],
		shallow: true,
	});

	beforeEach(() => {
		spectator = createSpectator();
	});

	it('renders', () => {
		expect(spectator.component).toBeTruthy();
	});
});
