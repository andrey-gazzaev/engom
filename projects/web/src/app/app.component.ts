import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderLayoutComponent } from './layouts/header-layout/header-layout.component';

/** Root component. */
@Component({
	selector: 'engomw-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [RouterOutlet, HeaderLayoutComponent],
})
export class AppComponent {}
