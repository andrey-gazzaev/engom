import { Pipe, PipeTransform } from '@angular/core';
import { User } from '@engom/common/core/models/user';

/** Full name pipe. */
@Pipe({
	name: 'engomcFullName',
	standalone: true,
})
export class FullNamePipe implements PipeTransform {

	/** @inheritdoc */
	public transform({ firstName, lastName }: User): string {
		return `${firstName} ${lastName}`;
	}
}
