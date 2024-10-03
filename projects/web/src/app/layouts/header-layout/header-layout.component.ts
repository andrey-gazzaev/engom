import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@engom/common/core/services/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';
import { FullNamePipe } from '@engom/common/shared/pipes/fullname.pipe';

import { injectWebAppRoutes } from '../../features/shared/web-route-paths';

/** Header layout component. */
@Component({
	selector: 'engomw-header-layout',
	styleUrl: './header-layout.component.css',
	templateUrl: 'header-layout.component.html',
	standalone: true,
	imports: [MatIcon, MatIconButton, AsyncPipe, FullNamePipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderLayoutComponent {
	/** Users service. */
	protected readonly userService = inject(UserService);

	private readonly router = inject(Router);

	private readonly destroyRef = inject(DestroyRef);

	/** Route paths. */
	private readonly routePaths = injectWebAppRoutes();

	/** Handles click on logout button. */
	protected onLogoutClick(): void {
		this.userService
			.logout()
			.pipe(
				tap(() => this.router.navigate([this.routePaths.auth.children.login.url])),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe();
	}
}
