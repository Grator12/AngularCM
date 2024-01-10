import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {INavigationItem} from "../../interfaces/inavigation-item";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {MenuService} from "../../services/menu/menu.service";
import {Observable} from "rxjs";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'gcm-menu',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatListModule, RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    class: 'menu'
  }
  // encapsulation: ViewEncapsulation.None


})
export class MenuComponent {

  @Input() public title: string = "";
  @Input() public navLinks: INavigationItem[] = [];


  get activatedLinkId$(): Observable<number> {
    return this.menuService.activatedLinkId$;
  }

  constructor(private menuService: MenuService) {
  }


  public setActiveLinkId(id: number) {
    this.menuService.activatedLinkId$.next(id);
  }

}
