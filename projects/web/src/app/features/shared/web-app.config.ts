import { Injectable } from '@angular/core';
import { AppConfig } from '@engom/common/core/services/app.config';

/** App-specific implementation of app config. */
@Injectable()
export class WebAppConfig extends AppConfig {

	/** @inheritdoc */
	public readonly apiUrl: string = import.meta.env.NG_APP_API_URL;

	/** @inheritdoc */
	public readonly version: string = this.getAppVersion();

	/**
	 * Provides app version with optional suffix.
	 */
	private getAppVersion(): string {
		return this.applySuffixIfPresent(
			this.applySuffixIfPresent(import.meta.env.NG_APP_VERSION, import.meta.env.NG_APP_COMMIT),
			import.meta.env.NG_APP_ENV,
		);
	}

	/**
	 * Applies a provided suffix if it's present.
	 * @param str Base string.
	 * @param suffix Suffix.
	 */
	private applySuffixIfPresent(str?: string, suffix?: string): string {
		if (str == null) {
			throw new Error('Seems like NG_APP_VERSION is undefined. \
				Please make sure you\'ve provided a correct .env file that\'s specific to your environment');
		}
		return str.concat(suffix ? `-${suffix}` : '');
	}
}
