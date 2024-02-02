import {Injectable} from '@angular/core';
import {IAddBook, IBook, IEditBook, IHttpBook} from "../../interfaces/book";
import {BehaviorSubject, map, Observable, of, Subject, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AuthService} from "../authorization/auth.service";
import {v4} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private _currentId: string | null = null;
  public booksCountSubject = new BehaviorSubject<number | null>(null);

  // private _books: IBook[] = [
  //   {
  //     id: this._currentId,
  //     name: "Думай медленно Решай быстро",
  //     author: {
  //       firstName: "Даниэль",
  //       surname: "Канеман"
  //     }
  //   },
  //
  // ];
  public books$ = new BehaviorSubject<IBook[]>([]);

  constructor(private httpClient: HttpClient,
              private authService: AuthService
  ) {
    //this._booksCountSubject.next(this._books.length);
    this.books$.pipe(map(books => books.length)).subscribe((value) => this.booksCountSubject.next(value));
  }


  // public getAllBooks(): Observable<IBook[]> {
  //   this.sendBooksCount();
  //   return of(this._books);
  // }
  public getAllBooks(): Observable<IBook[]> {

    return this.httpClient.get<IHttpBook[]>(environment.apiUrl + 'books',).pipe(
      map(books => {

        return this.convertBooks(books);
      }),
      tap(books => {

        this.books$.next(books);
        console.log(this.books$);
      })
    );

  }

  private convertBooks(books: IHttpBook[]): IBook[] {
    return books.map((book) => {
      return {
        id: (book.id),
        name: book.name,
        author: {
          firstName: book.author.split(' ')[1],
          surname: book.author.split(' ')[0]
        }
      }
    });
  }


  public addBook(AddBookReq: IAddBook): Observable<any> {
    // this._currentId = v4();
    // let book: IBook =
    //   {
    //     id: this._currentId.toString(),
    //     name: AddBookReq.name,
    //     author: AddBookReq.author,
    //   }
    let book =
      {
        name: AddBookReq.name,
        author: `${AddBookReq.author.firstName} ${AddBookReq.author.surname}`,
      }
    return this.httpClient.post<IBook>(environment.apiUrl + 'books', JSON.stringify(book))
      .pipe(
        tap(() => {
          //this.updateBookList();
          // this.books$.next([...this.books$.value, AddBookReq]);

          //this.getAllBooks();
        }));


    //this._booksCountSubject.next(this._books.length);

    // this.books$.next([...this.books$.value, book])
    // return of();

  }

  public editBook(editBookReq: IEditBook): Observable<any> {
    // const index = this.books$.value.findIndex(book => book.id === editBookReq.id);
    // if (index !== -1) {
    //   this.books$.value[index] = editBookReq;
    //   this.books$.next(this.books$.value);
    // }
    // return of();
    let book =
      {
        name: editBookReq.name,
        author: `${editBookReq.author.surname} ${editBookReq.author.firstName}`,
      }
    return this.httpClient.put<any>(environment.apiUrl + 'books/' + editBookReq.id, JSON.stringify(book))
      .pipe(
        tap(() => {
          this.books$.next(this.books$.value);
          //this.books$.next([...this.books$.value, editBookReq]);
        }));
  }

  public deleteBook(id: string): Observable<any> {

    return this.httpClient.delete(environment.apiUrl + 'books/' + id)
      .pipe(
        tap(() => {
          this.books$.next(this.books$.value);

        }));
  }

  public sendBooksCount(): Observable<number | null> {

    return this.booksCountSubject;
  }


}
