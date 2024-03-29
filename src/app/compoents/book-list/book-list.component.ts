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
import {trigger} from "@angular/animations";


@Component({

  selector: 'gcm-bookList',
  standalone: true,
  imports: [
    MatListModule,
    CommonModule,
    MatRippleModule,
    MatButtonModule,
    BookPipe,

  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
  host: {class: 'bookList'}
})

export class BookListComponent implements OnInit {
  constructor(
    protected bookService: BookService,
    private bookDialog: MatDialog,
  ) {
  }

  // public books: IBook[] = [];

  public ngOnInit(): void {
    this.loadBooks();
  }

  public addBook(): void {

    const dialogRef = this.bookDialog.open(AddBookComponent, {});
    dialogRef.afterClosed().subscribe((book: IAddBook) => {
      if (book) {
        this.bookService.addBook(book).subscribe(() => this.loadBooks());

      }
    });
  }

  public editBook(book: IBook): void {

    const dialogRef = this.bookDialog.open(AddBookComponent, {
      data: book
    });
    dialogRef.afterClosed().subscribe((book: IEditBook) => {
      if (book) {
        this.bookService.editBook(book).subscribe(() => this.loadBooks());
      }
    });
  }

  // public toggleFavorite(book: IBook): void {
  //   if (book.favorite) {
  //     book.favorite = false
  //   } else {
  //     book.favorite = true;
  //   }
  // }
  public onDelete($event: MouseEvent, id: string): void {
    $event.stopPropagation();
    this.bookService.deleteBook(id).subscribe(() => this.loadBooks());

  }

  private loadBooks() {
    this.bookService.getAllBooks().subscribe(books => {
    });
  }


  protected readonly trigger = trigger;
  protected readonly event = event;
}
