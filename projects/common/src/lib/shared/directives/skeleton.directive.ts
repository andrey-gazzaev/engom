/* eslint-disable @angular-eslint/no-input-rename */
import { Directive, ElementRef, HostBinding, Input, OnChanges } from '@angular/core';

/**
 * Generates random value between specified ranges using linear random generator.
 * @param max Max limit.
 * @param min Min.
 */
export function generateRandomInRange(max: number, min: number): number {
	return Math.random() * (max - min) + min;
}

/** The directive applies a skeleton class whenever the passed value is void. */
@Directive({ selector: '[engomcSkeleton]', standalone: true })
export class SkeletonDirective implements OnChanges {

	/** The value to check whether the skeleton should be applied. */
	@Input('engomcSkeleton')
	public value?: unknown;

	/** The skeleton class binding. */
	@HostBinding('class.engomc-skeleton')
	public get skeletonClass(): boolean {
		return this.value == null || this.value === '';
	}

	/** Min width to generate. */
	@Input('engomcSkeletonMinWidth')
	public min: number | undefined;

	/** Max width to generate. */
	@Input('engomcSkeletonMaxWidth')
	public max: number | undefined;

	/** CSS width units. */
	@Input()
	public engomcWidthUnits = 'ch';

	/** Width of skeleton in `engomcWidthUnits`. */
	@HostBinding('style.width')
	public get _width(): string | undefined {
		if (this.min == null && this.max == null) {
			return '100%';
		}
		if (this.width != null) {
			return `${this.width}${this.engomcWidthUnits}`;
		}

		return undefined;
	}

	/** Display binding. If width attribute is passed, display inline-block is set so that the width would work. */
	@HostBinding('style.display')
	public get _display(): string {
		if (this.max == null && this.min == null) {
			return 'block';
		}
		if (this.width != null) {
			return `inline-block`;
		}

		return this.elementRef.nativeElement.style.display;
	}

	private width: number | null = null;

	public constructor(
		private readonly elementRef: ElementRef<HTMLElement>,
	) {}

	/** @inheritdoc */
	public ngOnChanges(): void {
		if (this.max == null || this.min == null) {
			return;
		}

		const valueIsPresent = this.value != null && this.value !== '';
		if (valueIsPresent) {
			this.width = null;
		} else {
			this.width = generateRandomInRange(this.min, this.max);
		}
	}
}
