import {Pipe, PipeTransform} from '@angular/core';
import {IBook} from "../../interfaces/book";

@Pipe({
  name: 'bookPipe',
  standalone: true
})
export class BookPipe implements PipeTransform {

  public transform(book: IBook, ...args: unknown[]): string {
    return `${book.author.surname} ${book.author.firstName[0]}.`;
  }

}
