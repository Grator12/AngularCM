import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {IAddBook, IBook, IEditBook} from "../../../interfaces/book";
import {MatButtonModule} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {BookService} from "../../../services/book/book.service";

@Component({
  selector: 'gcm-add-book',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss'
})
export class AddBookComponent implements OnInit {


  public bookForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    authorFirstName: new FormControl<string>('', Validators.required),
    authorSurname: new FormControl<string>('', Validators.required)
  })

  public onClose(): void {
    this.dialogRef.close();
  }

  private onAdd(): void {
    let book: IAddBook = {
      name: this.bookForm.get('name')?.value ?? '',
      author: {
        firstName: this.bookForm.get('authorFirstName')?.value ?? '',
        surname: this.bookForm.get('authorSurname')?.value ?? '',
      }
    }

    this.dialogRef.close(book);
  }

  public onOk(): void {
    if (this.data) {
      this.onEdit();
    } else {
      this.onAdd();
    }
  }

  private onEdit(): void {
    if (!this.data) return;
    if (!this.data.id) return;
    let book: IEditBook = {

      id: this.data.id,
      name: this.bookForm.get('name')?.value ?? '',
      author: {
        firstName: this.bookForm.get('authorFirstName')?.value ?? '',
        surname: this.bookForm.get('authorSurname')?.value ?? '',
      }
    }

    this.dialogRef.close(book);
  }


  ngOnInit() {
    if (this.data) {
      this.bookForm.get('name')?.setValue(this.data.name);
      this.bookForm.get('authorFirstName')?.setValue(this.data.author.firstName);
      this.bookForm.get('authorSurname')?.setValue(this.data.author.surname);

    }
  }

  constructor(public dialogRef: MatDialogRef<AddBookComponent>,
              @Inject(MAT_DIALOG_DATA) public data?: IBook,
  ) {

  }

}
