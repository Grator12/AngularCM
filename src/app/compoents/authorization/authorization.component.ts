import {Component} from '@angular/core';
import {AuthService} from "../../services/authorization/auth.service";

@Component({
  selector: 'gcm-authorization',
  standalone: true,
  imports: [],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss'
})
export class AuthorizationComponent {
  public signIn(): void {
    this.authService.signIn();

  }


  constructor(public authService: AuthService) {
  }

}
