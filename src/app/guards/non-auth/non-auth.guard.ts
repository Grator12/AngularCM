import {CanActivateFn} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../services/authorization/auth.service";

export const nonAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  return !authService.isAuthorized;
};
