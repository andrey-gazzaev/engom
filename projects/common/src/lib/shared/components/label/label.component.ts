import { ChangeDetectionStrategy, Component, ContentChild, Input, ViewChild } from '@angular/core';
import { NgControl, NgModel, FormControlDirective } from '@angular/forms';

import { FormErrorWrapperComponent } from '../form-error-wrapper/form-error-wrapper.component';

/**
 * Label component. Displays error and label for the input component.
 */
@Component({
	selector: 'engomc-label',
	templateUrl: './label.component.html',
	styleUrls: ['./label.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [FormErrorWrapperComponent],
})
export class LabelComponent {
	/**
	 * Text of control's label.
	 */
	@Input()
	public labelText: string | null = null;

	/** Wrapper displaying errors. */
	@ViewChild(FormErrorWrapperComponent, { static: true })
	public errorWrapper!: FormErrorWrapperComponent;

	/** Catch inner input by form control directive. */
	@ContentChild(NgControl)
	public set input(i: NgModel | FormControlDirective) {
		// Need to pass this manually, since ContentChild does not catch the slot that is nested.
		this.errorWrapper.input = i;
	}
}
