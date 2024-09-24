import { ChangeDetectionStrategy, Component, ContentChild, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControlDirective, NgControl, NgModel, ValidationErrors } from '@angular/forms';
import { listenControlTouched } from '@engom/common/core/utils/rxjs/listen-control-touched';
import { AppValidators } from '@engom/common/core/utils/validators';
import { distinct, EMPTY, filter, map, merge, Observable, ReplaySubject, switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { ValidationMessageComponent } from '../validation-message/validation-message.component';

/** Wrapper component that queries errors from form control directive and presents it. */
@Component({
	selector: 'engomc-form-error-wrapper',
	templateUrl: './form-error-wrapper.component.html',
	styleUrls: ['./form-error-wrapper.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [ValidationMessageComponent, AsyncPipe],
})
export class FormErrorWrapperComponent implements OnInit {

	/** Form control directive. */
	protected readonly input$ = new ReplaySubject<NgModel | FormControlDirective>(1);

	/** Errors stream. */
	protected readonly errorsSubject = new ReplaySubject<ValidationErrors | null>(1);

	private readonly destroyRef = inject(DestroyRef);

	/** Catch inner input by form control directive. */
	@ContentChild(NgControl, { descendants: true })
	public set input(i: NgModel | FormControlDirective) {
		if (i) {
			this.input$.next(i);
		}
	}

	/** Custom errors message. */
	@Input()
	public set errorText(value: string | null) {
		this.errorsSubject.next(
			value != null ? AppValidators.buildAppError(value) : value,
		);
	}

	/** @inheritDoc */
	public ngOnInit(): void {
		this.initErrorStreamSideEffect().pipe(
			takeUntilDestroyed(this.destroyRef),
		)
			.subscribe();
	}

	private initErrorStreamSideEffect(): Observable<ValidationErrors | null> {
		return this.input$.pipe(
			distinct(),
			switchMap(input =>
				merge(
					input.statusChanges ?? EMPTY,
					listenControlTouched(input.control).pipe(filter(touched => touched)),
				).pipe(map(() => input))),
			tap(input => this.errorsSubject.next(input.errors)),
		);
	}
}
