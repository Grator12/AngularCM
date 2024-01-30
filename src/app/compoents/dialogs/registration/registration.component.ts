import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IAddBook, IBook} from "../../../interfaces/book";
import {AuthorizationComponent} from "../../authorization/authorization.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {IUser} from "../../../interfaces/user";
import {AuthService} from "../../../services/authorization/auth.service";

@Component({
  selector: 'gcm-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  constructor(public dialogRef: MatDialogRef<AuthorizationComponent>, private authService: AuthService
  ) {

  }

  public registrationForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>("", Validators.required)
  })

  public onClose(): void {
    this.dialogRef.close();
  }

  public onReg(): void {
    let user: IUser = {
      name: this.registrationForm.get('name')?.value ?? '',
      email: this.registrationForm.get('email')?.value ?? '',
      password: this.registrationForm.get('password')?.value ?? '',

    }

    this.authService.register(user).subscribe(() => {
      this.dialogRef.close(user);
    });
  }
}
