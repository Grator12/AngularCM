import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {INavigationItem} from "../interfaces/inavigation-item"
@Component({
  selector: 'gcm-nav-buttons',
  standalone: true,
  imports: [MatButtonModule,MatListModule],
  templateUrl: './nav-buttons.component.html',
  styleUrl: './nav-buttons.component.scss'
})
export class NavButtonsComponent {
  public navLinks:INavigationItem[]=[
    {
      id:'first',
      label:"first element",
      icon:"home"

    },
    {
      id:'second',
      label:"second element",
      icon:"home"

    },
    {
      id:'third',
      label:"third element",
      icon:"home"

    },
  ];
  public activeLinkId:string ='first';
}
