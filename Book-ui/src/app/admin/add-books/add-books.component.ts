import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.css']
})
export class AddBooksComponent implements OnInit {

   _id: string = "";
  Title: string ="";
  Author: Array<any> = [];
  Genre: Array<any> = [];
  Price: Number = 0;
  Image: string = ""

  constructor(private bookService: BookService, public router: Router){

  }
  ngOnInit(): void {
      
  }
  // loadValues(formValue: NgForm){
  //   let bookDetails = {
  //     id: "JEE1234",
  //     Title: "WZY",
  //     Author: ["ABC"],
  //     Genre: ["XYZ"],
  //     Price: 578.50
  //   }
  // }
  addBook(formValue: NgForm){
    console.log(formValue.value);
    const FormValue = formValue.value;

    const postBody = {
      _id: FormValue._id,
      Title: FormValue.Title,
      Price: FormValue.Price,
      Author: FormValue.Author,
      Genre: FormValue.Genre,
      Image : FormValue.Image
    }
    this.bookService.addBook(postBody).subscribe(data =>{
      console.log(data);
      window.alert("Book Added Successfully");
      this.router.navigate(['/admin']);
    },(err)=>{
      console.log("Unable to add",err);
      formValue.reset();
    })
  }
  resetForm(formValue: NgForm){
    formValue.reset();
  }

}
