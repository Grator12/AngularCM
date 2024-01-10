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
  styleUrl: './book-list.component.scss'

})

export class BookListComponent implements OnInit {
  public books: IBook[] = [];

  public ngOnInit(): void {
    this.bookService.getAllBooks().subscribe(books => {
      this.books = books;
    });
  }

  public addBook(): void {
    this.bookService.addBook().subscribe(() => {

    });
  }

  //private loadbbok

  constructor(
    private bookService: BookService
  ) {
  }
}
