import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from "@angular/material/list";
import {INavigationItem} from "../../interfaces/inavigation-item";

@Component({
  selector: 'gcm-nav-buttons',
  standalone: true,
  imports: [MatListModule,CommonModule],
  templateUrl: './nav-buttons.component.html',
  styleUrl: './nav-buttons.component.scss'
})
export class NavButtonsComponent {

}
