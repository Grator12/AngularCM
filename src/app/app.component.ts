import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {MatButtonModule} from "@angular/material/button";
import {NavButtonsComponent} from "./compoents/nav-buttons/nav-buttons.component";
import {DrawerComponent} from "./compoents/navigation/navigation.component";


@Component({
  selector: 'gcm-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavButtonsComponent, MatButtonModule, DrawerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AngularCM';


}
