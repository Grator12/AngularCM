import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {IAuthorization} from "../../interfaces/authorization";
import {IUser} from "../../interfaces/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {environment} from "../../../environments/environment.development";

//import {toString} from "jasmine";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public _user: string = '';
  private _accessToken: string = '';

  constructor(private router: Router, private httpClient: HttpClient) {
    //this.getFromLocalStorage('user', this._user);


  }

  public getAccessToken(): string {
    return this._accessToken;
  }

  private getFromLocalStorage(key: string, value: any): void {
    let l1 = localStorage.getItem(key);
    if (l1 === null) {
      localStorage.setItem(key, value);
    } else {
      value = l1;
    }
  }

  // public signIn(model: IAuthorization): Observable<any> {
  //   let headers = new HttpHeaders({
  //     ['accept']: 'application/json',
  //     ['Content-Type']: 'application/json'
  //   });
  //   this._user = model.email;
  //   localStorage.setItem('user', this._user);
  //   return this.httpClient.post(environment.apiUrl + 'auth/signIn', JSON.stringify(model), {headers: headers});
  //
  //
  //   // this.router.navigate(['/']);
  // }

  public signIn(model: IAuthorization): Observable<any> {
    let headers = new HttpHeaders({
      ['Content-Type']: 'application/json'
    });
    this._user = model.email;
    localStorage.setItem('user', this._user);
    return this.httpClient.post<any>(environment.apiUrl + 'auth/login', JSON.stringify(model), {headers: headers}).pipe(
      tap({
        next: result => {
          this._accessToken = result.accessToken;
          this.parseUserName();
        }, error: _ => {
          this._accessToken = '';
          this._user = '';
        }
      })
    );


    // this.router.navigate(['/']);
  }

  public signOut(): void {
    this._user = '';

    localStorage.setItem('user', '');
    this.goToAuth();
  }

  private parseUserName(): void {
    let payload = this._accessToken.split('.')[1];
    let authDataStr = atob(payload);
    let authData = JSON.parse(authDataStr);
    this._user = `${authData.name} <${authData.email}>`;
  }


  public goToAuth(): void {
    this.router.navigate(['/authorization']);
  }

  public get isAuthorized(): boolean {
    return this._accessToken != '';
    // return this._user != '';
  }


  // -------------------REGISTRATION-------------------

  public register(model: IUser): Observable<any> {
    let headers = new HttpHeaders({['Content-Type']: 'application/json'});
    return this.httpClient.post(environment.apiUrl + 'auth/register', JSON.stringify(model), {headers: headers});

  }


}
