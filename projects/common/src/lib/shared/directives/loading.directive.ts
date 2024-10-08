import { Directive, ElementRef, Input, inject } from '@angular/core';

/**
 * Loading state directive. Applies loading state on element. Color and size are customizable via `--spinner-color` and `--spinner-size`.
 * @example
 * ```html
 * <button [engomcLoading]="isLoading$ | async" (click)="isLoading$.next(true)">Submit</button>
 * ```
 */
@Directive({
	selector: '[engomcLoading]',
	standalone: true,
})
export class LoadingDirective {

	private readonly elementRef = inject(ElementRef<HTMLElement>);

	/** Loading beacon. */
	@Input()
	public set engomcLoading(loading: boolean | null) {
		if (loading) {
			this.elementRef.nativeElement.classList.add('engomc-loading');
			this.disable();
		} else {
			this.elementRef.nativeElement.classList.remove('engomc-loading');
			this.enable();
		}
	}

	/** Enable element. */
	private disable(): void {
		this.elementRef.nativeElement.setAttribute('disabled', 'true');
	}

	/** Disable element. */
	private enable(): void {
		this.elementRef.nativeElement.removeAttribute('disabled');
	}
}
