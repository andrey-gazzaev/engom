import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from '@engom/common/core/interceptors/auth.interceptor';
import { AppConfig } from '@engom/common/core/services/app.config';

import { appRoutes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { WebAppConfig } from './app/features/shared/web-app.config';
import { provideWebAppRoutes } from './app/features/shared/web-route-paths';

const httpInterceptorProviders = [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }];

bootstrapApplication(AppComponent, {
	providers: [
		importProvidersFrom(BrowserModule),
		...httpInterceptorProviders,
		{ provide: AppConfig, useClass: WebAppConfig },
		provideAnimations(),
		provideHttpClient(withInterceptorsFromDi()),
		provideRouter(appRoutes),
		provideWebAppRoutes(),
	],
})
	.catch(err => console.error(err));
