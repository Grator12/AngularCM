import {HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {inject, Injectable} from "@angular/core";
import {AuthService} from "../services/authorization/auth.service";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const isApiUrl = req.url.startsWith(environment.apiUrl);
  let headers = req.headers.set('Content-Type', 'application/json');
  if (authService.isAuthorized && isApiUrl) headers = headers.set('Authorization', `Bearer ${authService.getAccessToken()}`);

  req = req.clone({headers: headers});
  return next(req);

};

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    let headers = request.headers.set('Content-Type', 'application/json');
    if (this.authService.getAccessToken() && isApiUrl) {
      headers = headers.set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    }
    request = request.clone({
      headers: headers
    });
    return next.handle(request);
  }
}
