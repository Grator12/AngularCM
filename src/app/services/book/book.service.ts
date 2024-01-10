import {Injectable} from '@angular/core';
import {IBook} from "../../interfaces/book";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private _currentId: number = 1
  private _books: IBook[] = [
    {
      id: this._currentId,
      name: "Думай медленно Решай быстро",
      author: "Папа Римский"
    },

  ];

  public getAllBooks(): Observable<IBook[]> {
    console.log('getAll');
    return of(this._books);
  }

  public addBook(): Observable<any> {
    console.log("addBook");
    this._currentId++;
    let book: IBook =
      {
        id: this._currentId,
        name: "Пограничная река",
        author: "Некто"
      }
    this._books.push(book);
    return of();

  }

  constructor() {
  }
}
