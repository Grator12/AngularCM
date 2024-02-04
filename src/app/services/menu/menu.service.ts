import {Injectable} from '@angular/core';
import {BehaviorSubject, map, pairwise, Subject, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public activatedLinkId$ = new BehaviorSubject<number>(2);

  // constructor() {
  //
  //   this.activatedLinkId$.pipe(
  //     tap((val) => console.log('tap', val)),
  //     map((v) => v + 10),
  //     pairwise()
  //   ).subscribe((val) => console.log('vvv', val))
  // }
}
