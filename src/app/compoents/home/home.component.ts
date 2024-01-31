import {Component, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../services/authorization/auth.service";

@Component({
  selector: 'gcm-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {class: 'gcm-home'},
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  constructor(private authService: AuthService) {

  }

  public getUserName(): string {
    return this.authService._user.split(' ')[0];
  }
}
