import { faker } from '@faker-js/faker';

import { ValidationErrorDto } from '../dtos/validation-error.dto';

import { extractErrorMessageByErrorKey } from './extract-error-message';

type MockErrorDto = ValidationErrorDto<{
	readonly first: string;
	readonly firstOther: string;
	readonly second: string;
	readonly arrayFields: string[];
	readonly nested: {
		readonly nestedNested: {
			readonly nestedNestedNested: {
				readonly field: string;
			};
		};
	};
	readonly emptyArray: string[];
}>;

const expectedErrorMessage = faker.lorem.lines();
const expectedErrorForFirstOtherAttr = faker.lorem.lines();
const mockErrorDto: MockErrorDto = {
	type: 'validation_error',
	errors: [
		{
			attr: 'first',
			detail: expectedErrorMessage,
			code: 'invalid',
		},
		{
			attr: 'firstOther',
			detail: expectedErrorForFirstOtherAttr,
			code: 'invalid',
		},
		{
			attr: 'arrayFields.0',
			detail: expectedErrorMessage,
			code: 'invalid',
		},
		{
			attr: 'arrayFields.3',
			detail: expectedErrorMessage,
			code: 'invalid',
		},
		{
			attr: 'nested.nestedNested.nestedNestedNested.field',
			detail: expectedErrorMessage,
			code: 'invalid',
		},
	],
};

describe('Extracting an error message from', () => {
	it('a field of an object that contains an error', () => {
		expect(extractErrorMessageByErrorKey(mockErrorDto, 'first')).toBe(expectedErrorMessage);
	});

	it('the object field containing the error; an attribute that is the start of an attribute of another error.', () => {
		expect(extractErrorMessageByErrorKey(mockErrorDto, 'firstOther', { isExactMatch: true })).toBe(expectedErrorForFirstOtherAttr);
	});

	it('a nested field of an object containing an error', () => {
		expect(extractErrorMessageByErrorKey(mockErrorDto, 'nested.nestedNested.nestedNestedNested.field')).toBe(
			expectedErrorMessage,
		);
	});

	it('object fields that contain errors', () => {
		const expectedErrorMessages = [];
		expectedErrorMessages[0] = expectedErrorMessage;
		expectedErrorMessages[3] = expectedErrorMessage;
		expect(extractErrorMessageByErrorKey(mockErrorDto, 'arrayFields')).toEqual(expectedErrorMessages);
	});
});

it('A field that does not contain an error message will not be extracted', () => {
	expect(extractErrorMessageByErrorKey(mockErrorDto, 'second')).toBe(undefined);
});

it('Error not contained in array', () => {
	expect(extractErrorMessageByErrorKey(mockErrorDto, 'emptyArray.1')).toBe(undefined);
});
