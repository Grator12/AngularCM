import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {INavigationItem} from "../../interfaces/inavigation-item";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {AsyncPipe, CommonModule} from "@angular/common";
import {MenuService} from "../../services/menu/menu.service";
import {BehaviorSubject, Observable, Subject, Subscription, tap} from "rxjs";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {BookService} from "../../services/book/book.service";

@Component({
  selector: 'gcm-menu',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatListModule, RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    class: 'menu'
  }
  // encapsulation: ViewEncapsulation.None


})
export class MenuComponent implements OnInit, OnDestroy {
  private _booksCountSubscription: Subscription = new Subscription();
  public booksCount$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  @Input() public title: string = "";
  @Input() public navLinks: INavigationItem[] = [];

  //public booksCount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);


  get activatedLinkId$(): Observable<number> {
    return this._menuService.activatedLinkId$;
  }

  constructor(private _menuService: MenuService, private _bookService: BookService) {

  }

  ngOnInit() {
    // this.booksCount$.subscribe((v) => console.log('booksCount$', v))
    // this._bookService.getBooksCount().pipe(tap((r) => console.log('ddddddddd ', r))).subscribe(val => this.booksCount$.next(val));
    this._booksCountSubscription.add(this._bookService.sendBooksCount().subscribe(count => {
      this.booksCount$.next(count);
    }));
  }

  ngOnDestroy() {
    this._booksCountSubscription.unsubscribe();
  }

  public setActiveLinkId(id: number) {
    this._menuService.activatedLinkId$.next(id);
  }


}
