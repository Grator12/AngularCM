import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuth: boolean = localStorage();

  constructor(private router: Router) {
  }

  public signIn(): void {
    this._isAuth = true;
    this.router.navigate(['/']);
  }

  public signOut(): void {
    this._isAuth = false;
    this.goToAuth();
  }

  public goToAuth(): void {
    this.router.navigate(['/authorization']);
  }

  public get isAuthorized(): boolean {
    return this._isAuth;
  }
}
