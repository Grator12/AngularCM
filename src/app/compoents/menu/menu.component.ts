import { Component,Input } from '@angular/core';
import {INavigationItem} from "../../interfaces/inavigation-item";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'gcm-menu',
  standalone: true,
  imports: [CommonModule,MatButtonModule, MatListModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  host: {
    class: 'menu'
  }
})
export class MenuComponent {
@Input() public title: string = "";
@Input() public navLinks:INavigationItem[]=[];
@Input() public activeLinkId:number=-1;
}
