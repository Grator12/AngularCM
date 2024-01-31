import {Component, OnInit} from '@angular/core';
import {MatListModule} from "@angular/material/list";
import {BookService} from "../../services/book/book.service";
import {CommonModule} from "@angular/common";
import {MatRippleModule} from "@angular/material/core";
import {IAddBook, IBook, IEditBook, IHttpBook} from "../../interfaces/book";
import {MatButtonModule} from "@angular/material/button";
import {BookPipe} from "../../pipes/book/book.pipe";
import {MatDialog} from "@angular/material/dialog";
import {AddBookComponent} from "../dialogs/add-book/add-book.component";

@Component({

  selector: 'gcm-bookList',
  standalone: true,
  imports: [
    MatListModule,
    CommonModule,
    MatRippleModule,
    MatButtonModule,
    BookPipe
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
  host: {class: 'bookList'}
})

export class BookListComponent implements OnInit {
  public books: IBook[] = [];

  public ngOnInit(): void {
    this.loadBooks();
  }

  public addBook(): void {

    const dialogRef = this.bookDialog.open(AddBookComponent, {});
    dialogRef.afterClosed().subscribe((book: IAddBook) => {
      if (book) {
        this.bookService.addBook(book);
      }
    });
  }

  public editBook(book: IBook): void {

    const dialogRef = this.bookDialog.open(AddBookComponent, {
      data: book
    });
    dialogRef.afterClosed().subscribe((book: IEditBook) => {
      if (book) {
        this.bookService.editBook(book);
      }
    });
  }

  private convertBooks(books: IHttpBook[]): IBook[] {
    return books.map((book) => {
      return {
        id: parseInt(book.id),
        name: book.name,
        author: {
          firstName: book.author.split(' ')[1],
          surname: book.author.split(' ')[0]
        }
      }
    });
  }

  private loadBooks() {
    this.bookService.getAllBooks().subscribe(books => {

      this.books = this.convertBooks(books);
    });
  }


  constructor(
    private bookService: BookService,
    private bookDialog: MatDialog,
  ) {
  }
}
