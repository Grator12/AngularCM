import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {JwtInterceptor, jwtInterceptor} from "./interceptor/jwt.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), importProvidersFrom(HttpClientModule),
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ]
};
