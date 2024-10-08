interface ImportMeta {
	readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
	/**
	 * Built-in environment variable.
	 * @see Docs https://github.com/chihab/ngx-env#ng_app_env.
	 */
	readonly NG_APP_ENV: string;
	readonly NG_APP_VERSION: string;
	readonly NG_APP_COMMIT: string;
	readonly NG_APP_API_URL: string;
}
