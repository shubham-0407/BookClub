import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  bookResult: any;
  bookList: any;
  searchKeyword: any;
  searchResult: any;

  constructor(private bookService: BookService){
    this.getBooksList();
   // window.location.reload();
  }

   
  
  getBooksList(){
    this.bookService.getBooks().subscribe((data) => {
      this.bookResult = data;
      this.bookList = this.bookResult.result;
      console.log(this.bookList);
    });
  }

   /** Search book record */
   Search(formValue: NgForm){
    this.searchKeyword = formValue.value.searchKeyword;
    this.bookService.searchBook(this.searchKeyword).subscribe((data) =>
      {this.searchResult = data;
      this.bookList = this.searchResult.result;
      console.log(this.bookList);
    });
  }

}
