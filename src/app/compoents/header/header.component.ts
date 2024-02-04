import {Component, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../services/authorization/auth.service";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'gcm-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  constructor(public authService: AuthService) {
  }

  public signOut(): void {
    this.authService.signOut();
  }

  public getUserName(): string {
    return this.authService._user.split(' ')[0];
  }

}
