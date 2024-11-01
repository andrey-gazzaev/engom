import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SkeletonDirective } from '../../directives/skeleton.directive';

/** Skeleton component. */
@Component({
	selector: 'engomc-skeleton',
	templateUrl: 'skeleton.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [SkeletonDirective],
})
export class SkeletonComponent {}
