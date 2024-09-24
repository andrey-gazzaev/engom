import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { createRoutingFactory, mockProvider, SpectatorRouting } from '@ngneat/spectator';
import { ReplaySubject } from 'rxjs';
import { authGuard } from '@engom/common/core/guards/auth-guard';
import { Routes } from '@angular/router';

import { UserService } from '../services/user.service';

@Component({ standalone: true, template: '' })
class FirstFakeComponent {}

@Component({ standalone: true, template: '' })
class SecondFakeComponent {}

@Component({ standalone: true, template: '' })
class ThirdFakeComponent {}

@Component({ standalone: true, template: '' })
class FourthFakeComponent {}

@Component({ standalone: true, template: '' })
class FifthFakeComponent {}

const ROOT_ROUTE = '';
const AUTHORIZED_LOGGED_IN_ROUTE = 'authorized-logged-in-route';
const AUTHORIZED_LOGGED_OUT_ROUTE = 'authorized-logged-out-route';
const UNAUTHORIZED_LOGGED_IN_ROUTE = 'unauthorized-logged-in-route';
const UNAUTHORIZED_LOGGED_OUT_ROUTE = 'unauthorized-logged-out-route';

const routes: Routes = [
	{
		path: ROOT_ROUTE,
		pathMatch: 'full',
		component: FirstFakeComponent,
	},
	{
		path: AUTHORIZED_LOGGED_IN_ROUTE,
		canMatch: [authGuard({ isAuthorized: true })],
		component: SecondFakeComponent,
	},
	{
		path: AUTHORIZED_LOGGED_OUT_ROUTE,
		canMatch: [authGuard({ isAuthorized: true })],
		component: ThirdFakeComponent,
	},
	{
		path: UNAUTHORIZED_LOGGED_IN_ROUTE,
		canMatch: [authGuard({ isAuthorized: false })],
		component: FourthFakeComponent,
	},
	{
		path: UNAUTHORIZED_LOGGED_OUT_ROUTE,
		canMatch: [authGuard({ isAuthorized: false })],
		component: FifthFakeComponent,
	},
];

describe('AuthGuard', () => {
	let isUserAuthorizedSubject: ReplaySubject<boolean>;
	let location: Location;
	let spectator: SpectatorRouting<FirstFakeComponent>;
	const createSpectator = createRoutingFactory({
		component: FirstFakeComponent,
		stubsEnabled: false,
		routes,
	});

	beforeEach(() => {
		isUserAuthorizedSubject = new ReplaySubject(1);
		spectator = createSpectator({
			providers: [
				mockProvider(UserService, {
					isAuthorized$: isUserAuthorizedSubject,
				}),
			],
		});
		location = spectator.inject(Location);
	});

	describe('when user is authorized', () => {
		beforeEach(() => {
			isUserAuthorizedSubject.next(true);
		});

		it('allows to proceed to an authorized route', async() => {
			await spectator.router.navigateByUrl(AUTHORIZED_LOGGED_IN_ROUTE);
			expect(location.path()).toContain(AUTHORIZED_LOGGED_IN_ROUTE);
		});

		it('does not allow to proceed to an unauthorized route', async() => {
			await spectator.router.navigateByUrl(UNAUTHORIZED_LOGGED_IN_ROUTE);
			expect(location.path()).not.toContain(UNAUTHORIZED_LOGGED_IN_ROUTE);
		});
	});

	describe('when user is not authorized', () => {
		beforeEach(() => {
			isUserAuthorizedSubject.next(false);
		});

		it('does not allows to proceed a authorized route', async() => {
			await spectator.router.navigateByUrl(AUTHORIZED_LOGGED_OUT_ROUTE);
			expect(location.path()).not.toContain(AUTHORIZED_LOGGED_OUT_ROUTE);
		});

		it('allows to proceed to an unauthorized route', async() => {
			await spectator.router.navigateByUrl(UNAUTHORIZED_LOGGED_OUT_ROUTE);
			expect(location.path()).toContain(UNAUTHORIZED_LOGGED_OUT_ROUTE);
		});
	});
});
