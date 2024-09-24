import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { User } from '@engom/common/core/models/user';
import { AppConfig } from '@engom/common/core/services/app.config';
import { UserService } from '@engom/common/core/services/user.service';
import { toggleExecutionState } from '@engom/common/core/utils/rxjs/toggle-execution-state';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoadingDirective } from '@engom/common/shared/directives/loading.directive';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { injectWebAppRoutes } from '../shared/web-route-paths';

/** Placeholder dashboard. */
@Component({
	selector: 'engomw-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [
		MatIconModule,
		LoadingDirective,
		RouterLink,
		AsyncPipe,
	],
})
export class DashboardComponent {

	/** Users service. */
	public readonly userService = inject(UserService);

	/** App config service. */
	public readonly appConfigService = inject(AppConfig);

	private readonly destroyRef = inject(DestroyRef);

	/** Whether the controls should be marked as in loading state. */
	protected readonly isLoading$ = new BehaviorSubject<boolean>(false);

	/** Route paths. */
	protected readonly routePaths = injectWebAppRoutes();

	/** Current user. */
	public readonly user$: Observable<User | null>;

	public constructor() {
		this.user$ = this.userService.currentUser$.pipe(
			shareReplay({ refCount: true, bufferSize: 1 }),
		);
	}

	/** Handles click on logout button. */
	public onLogoutClick(): void {
		this.userService.logout()
			.pipe(
				toggleExecutionState(this.isLoading$),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe();
	}
}
