import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatButtonModule} from "@angular/material/button";
import {DrawerComponent} from "./compoents/navigation/navigation.component";
import {AuthService} from "./services/authorization/auth.service";


@Component({
  selector: 'gcm-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButtonModule, DrawerComponent, RouterLink, RouterLinkActive,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AngularCM';

  public signOut(): void {
    this.authService.signOut();
  }

  constructor(public authService: AuthService) {
  }

}
