import {Injectable} from '@angular/core';
import {IAddBook, IBook, IEditBook, IHttpBook} from "../../interfaces/book";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AuthService} from "../authorization/auth.service";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private _currentId: number = 1
  private _booksCountSubject = new BehaviorSubject<number | null>(null);

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

  constructor(private httpClient: HttpClient,
              private authService: AuthService
  ) {
    this._booksCountSubject.next(this._books.length);

  }


  // public getAllBooks(): Observable<IBook[]> {
  //   this.sendBooksCount();
  //   return of(this._books);
  // }
  public getAllBooks(): Observable<IHttpBook[]> {

    let headers = new HttpHeaders({
      ['Content-Type']: 'application/json',
      ['Authorization']: `Bearer ${this.authService.getAccessToken()}`
    });
    return this.httpClient.get<IHttpBook[]>(environment.apiUrl + 'books', {
      headers: headers
    });
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
    this._booksCountSubject.next(this._books.length);


    return of();

  }

  public editBook(editBookReq: IEditBook): Observable<any> {
    const index = this._books.findIndex(book => book.id === editBookReq.id);
    if (index !== -1) {
      this._books[index] = editBookReq;
    }
    return of();
  }

  public sendBooksCount(): Observable<number | null> {

    return this._booksCountSubject;
  }


}
