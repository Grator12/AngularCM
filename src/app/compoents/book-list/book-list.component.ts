import {Component, OnInit} from '@angular/core';
import {MatListModule} from "@angular/material/list";
import {BookService} from "../../services/book/book.service";
import {CommonModule} from "@angular/common";
import {MatRippleModule} from "@angular/material/core";
import {IBook} from "../../interfaces/book";
import {MatButtonModule} from "@angular/material/button";

@Component({

  selector: 'gcm-bookList',
  standalone: true,
  imports: [
    MatListModule,
    CommonModule,
    MatRippleModule,
    MatButtonModule
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
  // styles: [' .bookList {grid-column: 2; grid-row: 1;}'],
  host: {class: 'bookList'}
})

export class BookListComponent implements OnInit {
  public books: IBook[] = [];

  public ngOnInit(): void {
    this.loadBooks();
  }

  public addBook(): void {
    this.bookService.addBook().subscribe(() => {
      this.loadBooks();
    });
  }

  private loadBooks() {
    this.bookService.getAllBooks().subscribe(books => {
      this.books = books;
    });
  }

  //private loadbbok

  constructor(
    private bookService: BookService
  ) {
  }
}
