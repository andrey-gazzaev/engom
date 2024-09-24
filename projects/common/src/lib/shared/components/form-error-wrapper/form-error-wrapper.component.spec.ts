import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { byTestId, createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { AppValidators } from '@engom/common/core/utils/validators';

import { ValidationMessageComponent } from '../validation-message/validation-message.component';

import { FormErrorWrapperComponent } from './form-error-wrapper.component';

describe('FormErrorWrapperComponent', () => {
	let spectator: SpectatorHost<FormErrorWrapperComponent>;

	const createSpectator = createHostFactory({
		component: FormErrorWrapperComponent,
		imports: [
			ReactiveFormsModule,
			FormsModule,
			ValidationMessageComponent,
		],
	});

	describe('error from reactive control', () => {
		let hostControlName: string;
		let hostControl: FormControl;

		beforeEach(() => {
			hostControlName = 'testControl';
			hostControl = new FormControl('');

			spectator = createSpectator(
				`<engomc-form-error-wrapper><input [formControl]="${hostControlName}"></engomc-form-error-wrapper>`,
				{
					hostProps: {
						[hostControlName]: hostControl,
					},
				},
			);
		});

		describe('when error is indeed present', () => {
			it('renders it', () => {
				const errorText = 'Test error';

				hostControl.setErrors(AppValidators.buildAppError(errorText));
				spectator.detectChanges();

				expect(spectator.query(byTestId('error'))).toHaveText(errorText);
			});
		});

		describe('when there is no error', () => {
			it('does not render it', () => {
				expect(spectator.query(byTestId('error'))).toHaveExactText('');
			});
		});
	});

	describe('with ngModel', () => {
		beforeEach(() => {
			const ngModelPropertyKey = 'testProperty';
			spectator = createSpectator(`<engomc-form-error-wrapper><input [ngModel]=${ngModelPropertyKey}></engomc-form-error-wrapper>`);
		});

		it('does not render any error', () => {
			expect(spectator.query(byTestId('error'))).toHaveExactText('');
		});
	});

	describe('error passed via prop', () => {
		describe('initially', () => {
			it('renders an error right away', () => {
				const errorText = 'Test error';

				spectator = createSpectator(`<engomc-form-error-wrapper errorText="${errorText}"/>`);

				expect(spectator.query(byTestId('error'))).toHaveText(errorText);
			});
		});

		describe('asynchronously/later', () => {
			it('does not render an error initially', () => {
				spectator = createSpectator(`<engomc-form-error-wrapper/>`);

				expect(spectator.query(byTestId('error'))).toHaveExactText('');
			});

			it('updates error the text later', () => {
				const errorText = 'Test error';

				spectator = createSpectator(`<engomc-form-error-wrapper/>`);

				spectator.setInput({ errorText });
				spectator.detectChanges();

				expect(spectator.query(byTestId('error'))).toHaveText(errorText);
			});
		});
	});
});
