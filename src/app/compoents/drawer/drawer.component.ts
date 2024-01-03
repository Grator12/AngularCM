import {Component,} from '@angular/core';
import {MenuComponent} from "../menu/menu.component";
import {INavigationItem} from "../../interfaces/inavigation-item";


@Component({
  selector: 'gcm-drawer',
  standalone: true,
  imports: [
    MenuComponent
  ],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss'
})
export class DrawerComponent {
  public navLinksFirst:INavigationItem[]=[
    {
      id:1,
      label:"Inbox",
      icon:"inbox",
      count:24
    },
    {
      id:2,
      label:"Outbox",
      icon:"send",
      count:24
    },
    {
      id:3,
      label:"Favorites",
      icon:"favorites",
      count:24
    },
    {
      id:4,
      label:"Trash",
      icon:"delete",
      count:24
    },


  ];
  public navLinksSecond:INavigationItem[]=[
    {
      id:5,
      label:"label",
      icon:"circle",
      count:24
    },
    {
      id:6,
      label:"label",
      icon:"circle",
      count:24
    },
  ];
  public activeLinkId:number =1;

}
