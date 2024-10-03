import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppConfig } from '@engom/common/core/services/app.config';
import { UserService } from '@engom/common/core/services/user.service';
import { toggleExecutionState } from '@engom/common/core/utils/rxjs/toggle-execution-state';
import { BehaviorSubject, switchMap } from 'rxjs';
import { LoadingDirective } from '@engom/common/shared/directives/loading.directive';
import { RouterLink } from '@angular/router';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { UserApiService } from '@engom/common/core/services/user-api.service';
import { TaskApiService } from '@engom/common/core/services/task-api.service';
import { filterNull } from '@engom/common/core/utils/rxjs/filter-null';

import { UserGroupsComponent } from './components/user-groups/user-groups.component';

/** Placeholder dashboard. */
@Component({
	selector: 'engomw-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [MatIconModule, LoadingDirective, RouterLink, AsyncPipe, JsonPipe, UserGroupsComponent],
})
export class DashboardComponent {
	/** Users service. */
	protected readonly userService = inject(UserService);

	/** App config service. */
	protected readonly appConfigService = inject(AppConfig);

	private readonly usersApiService = inject(UserApiService);

	private readonly tasksApiService = inject(TaskApiService);

	/** Whether the controls should be marked as in loading state. */
	protected readonly isLoading$ = new BehaviorSubject<boolean>(false);

	/** All users. */
	protected readonly users$ = this.usersApiService.getUsers().pipe(toggleExecutionState(this.isLoading$));

	/** Current user task. */
	protected readonly userTasks$ = this.userService.currentUser$.pipe(
		filterNull(),
		switchMap(({ id }) => this.tasksApiService.getTasksByUserId(id)),
	);
}
