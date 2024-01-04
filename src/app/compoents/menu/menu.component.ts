import {Component, EventEmitter, Input, Output} from '@angular/core';
import {INavigationItem} from "../../interfaces/inavigation-item";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'gcm-menu',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatListModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  host: {
    class: 'menu'
  },
  // encapsulation: ViewEncapsulation.None


})
export class MenuComponent {
  @Input() public title: string = "";
  @Input() public navLinks: INavigationItem[] = [];

  @Input() activeLinkId: number = -1;
  @Output() activeLinkIdChange = new EventEmitter<number>();


  public setActiveLinkId(id: number) {
    this.activeLinkIdChange.emit(id);
  }

}
