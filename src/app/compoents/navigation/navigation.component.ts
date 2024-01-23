import {Component,} from '@angular/core';
import {MenuComponent} from "../menu/menu.component";
import {INavigationItem} from "../../interfaces/inavigation-item";
import {MatListModule} from "@angular/material/list";


@Component({
  selector: 'gcm-navigation',
  standalone: true,
  imports: [
    MenuComponent,
    MatListModule,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class DrawerComponent {
  public navLinksFirst: INavigationItem[] = [
    {
      id: 1,
      label: "library",
      icon: "library_books",
      count: 24,
      link: '/library'
    },
    {
      id: 2,
      label: "Outbox",
      icon: "send",
      count: 24,
      link: '/'
    },
    {
      id: 3,
      label: "Favorites",
      icon: "favorite",
      count: 24,
      link: '/'
    },
    {
      id: 4,
      label: "Trash",
      icon: "delete",
      count: 24,
      link: '/'
    },


  ];
  public navLinksSecond: INavigationItem[] = [
    {
      id: 5,
      label: "label1",
      icon: "circle",
      count: 24,
      link: '/'
    },
    {
      id: 6,
      label: "label2",
      icon: "circle",
      count: 24,
      link: '/'
    },
  ];
  // public activeLinkId: number = 1;

}
