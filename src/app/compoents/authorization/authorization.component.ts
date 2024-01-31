import {Component} from '@angular/core';
import {AuthService} from "../../services/authorization/auth.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {IAuthorization} from "../../interfaces/authorization";
import {IUser} from "../../interfaces/user";
import {IBook, IEditBook} from "../../interfaces/book";
import {AddBookComponent} from "../dialogs/add-book/add-book.component";
import {MatDialog} from "@angular/material/dialog";
import {RegistrationComponent} from "../dialogs/registration/registration.component";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'gcm-authorization',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss'
})
export class AuthorizationComponent {
  constructor(public authService: AuthService, private regDialog: MatDialog, private router: Router) {
    let l1 = localStorage.getItem('allUsers')
    if (l1 != null) {
      this._allUsers = JSON.parse(l1);
    }
  }

  private _allUsers: IUser[] = [
    {
      name: 'testUser',
      email: 'wgsd@asfef',
      password: 'sfsdfsdf'
    }
  ];

  private checkReg(userEmail: string, userPassword: string): boolean {
    let reg: boolean = false;
    for (let i = 0; i < this._allUsers.length; i++) {
      if (this._allUsers[i].email === userEmail && this._allUsers[i].password === userPassword) {
        reg = true;
      }
    }

    return reg;
  }

  private addUser(user: IUser): void {
    this._allUsers.push(user);
    localStorage.setItem('allUsers', JSON.stringify(this._allUsers));
  }

  public registration(): void {

    const dialogRef = this.regDialog.open(RegistrationComponent, {});
    dialogRef.afterClosed().subscribe((userData: IUser) => {
      if (userData) {
        this.addUser(userData);

      }
    });
  }

  public signIn(): void {
    let loginModel: IAuthorization = {
      email: this.email.value,
      password: this.password.value
    }
    //if (this.checkReg(loginModel.email, loginModel.password))
    this.authService.signIn(loginModel).subscribe({
      next: () => {
        this.router.navigate(['/'])
      },
      error: () => {
        alert('Please, create new Account');
      }
    });
    // else alert('Please, create new Account');

  }


  authForm = new FormGroup({
    email: new FormControl<string>('', [
      Validators.required, Validators.email
    ]),
    password: new FormControl<string>("", Validators.required)
  });


  public get email(): FormControl<string> {
    return this.authForm.get('email') as FormControl<string>;
  }

  public get password(): FormControl<string> {
    return this.authForm.get('password') as FormControl<string>;
  }

}
