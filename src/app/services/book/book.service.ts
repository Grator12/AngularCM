import {Injectable} from '@angular/core';
import {IAddBook, IBook, IEditBook} from "../../interfaces/book";
import {Observable, of, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private _currentId: number = 1
  private _booksCountSubject = new Subject<number>();
  private _books: IBook[] = [
    {
      id: this._currentId,
      name: "Думай медленно Решай быстро",
      author: {
        firstName: "Даниэль",
        surname: "Канеман"
      }
    },

  ];

  public getAllBooks(): Observable<IBook[]> {
    this.sendBooksCount();
    return of(this._books);
  }

  public addBook(AddBookReq: IAddBook): Observable<any> {
    this._currentId++;
    let book: IBook =
      {
        id: this._currentId,
        name: AddBookReq.name,
        author: AddBookReq.author,
      }
    this._books.push(book);
    this.sendBooksCount();
    //this._booksCountSubject.next(this._books.length);

    return of();

  }

  public editBook(editBookReq: IEditBook): Observable<any> {
    const index = this._books.findIndex(book => book.id === editBookReq.id);
    if (index !== -1) {
      this._books[index] = editBookReq;
    }
    return of();
  }

  public sendBooksCount(): Observable<number> {
    this._booksCountSubject.next(this._books.length);
    return this._booksCountSubject;
  }

  constructor() {
  }
}
