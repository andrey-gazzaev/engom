import { OperatorFunction, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

/** Filters false dialog result values. */
export function filterFalseDialogResult(): OperatorFunction<boolean | undefined, true> {
	return (source$): Observable<true> =>
		source$.pipe(
			filter(value => value === true),
			map(() => true),
		);
}
