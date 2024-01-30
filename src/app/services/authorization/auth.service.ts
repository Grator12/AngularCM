import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {IAuthorization} from "../../interfaces/authorization";
import {IUser} from "../../interfaces/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment.development";

//import {toString} from "jasmine";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: string = '';

  constructor(private router: Router, private httpClient: HttpClient) {
    this.getFromLocalStorage('user', this._user);


  }

  private getFromLocalStorage(key: string, value: any): void {
    let l1 = localStorage.getItem(key);
    if (l1 === null) {
      localStorage.setItem(key, value);
    } else {
      value = l1;
    }
  }

  public signIn(AuthModel: IAuthorization): void {
    this._user = AuthModel.email;
    localStorage.setItem('user', this._user);
    this.router.navigate(['/']);
  }

  public signOut(): void {
    this._user = '';
    localStorage.setItem('user', '');
    this.goToAuth();
  }

  public goToAuth(): void {
    this.router.navigate(['/authorization']);
  }

  public get isAuthorized(): boolean {
    return this._user != '';
  }


  // -------------------REGISTRATION-------------------

  public register(model: IUser): Observable<any> {
    let headers = new HttpHeaders({['Content-Type']: 'application/json'});
    return this.httpClient.post(environment.apiUrl + 'auth/register', JSON.stringify(model), {headers: headers});

  }


}
