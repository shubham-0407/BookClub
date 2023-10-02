import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  firstName: any;
  lastName: any;
  gender: any;
  address: any;
  pincode: any;
  email: any;

  seller: any;
  sellerRecord: number;
  book: any;
  bookRecord: number;
  user: any;
  userRecord: number;
  memberRecord: number;

  sellerCount: number = 0;
  booksCount: number = 0;
  userCount: number = 0;
  memberCount: number = 0;


  constructor(private sellerService: SellerService, private userService: UserService, private bookService: BookService, private router: Router) { 
    this.getSellerCount();
    this.getUserCount();
    this.getBookCount();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  /**  Counter Value */
  getSellerCount(){
    this.sellerService.getSeller().subscribe((data) => {
      this.seller = data;
      this.sellerRecord = this.seller.recordCount;
      console.log(this.sellerRecord);
    })
  }

  getUserCount(){
    this.userService.getUser().subscribe((data) => {
      this.user = data;
      this.userRecord = this.user.recordCount;
    })
  }

  getBookCount(){
    this.bookService.getBooks().subscribe((data) => {
      this.book = data;
      this.bookRecord = this.book.recordCount;
    })
  }
  
  //we have created setinterval function with arrow function and
  //and set them in a variable that is projectcountstop.
  bookcountstop: any = setInterval(() => {
    this.booksCount++;
    //we need to stop this at  particular point; will use if condition
    if (this.booksCount == this.bookRecord) {
      //clearinterval will stop tha function
      clearInterval(this.bookcountstop);
    }

  }, 10) //10 is milisecond you can control it

  usercountstop: any = setInterval(() => {
    this.userCount++;
    if (this.userCount == this.userRecord) {
      clearInterval(this.usercountstop);
    }
  }, 10)

  sellercountstop: any = setInterval(() => {
    this.sellerCount++;
    if (this.sellerCount == this.sellerRecord) {
      clearInterval(this.sellercountstop);
    }
  }, 10)

   
  membercountstop: any = setInterval(() => {
    this.memberRecord = this.userRecord + this.sellerRecord;
    this.memberCount++;
    if (this.memberCount == this.memberRecord) {
      clearInterval(this.membercountstop);
    }
  }, 10)


  /*** Adding seller details */
  sellerDetail(formValue: NgForm) {
    const postBody = {
      firstName: formValue.value.firstName,
      lastName: formValue.value.lastName,
      address: formValue.value.address,
      pincode: formValue.value.pincode,
      email: formValue.value.email
    }
    this.sellerService.addSeller(postBody).subscribe((data) => {
      console.log(data);
      formValue.reset();
      window.alert("Seller requested successfully")
      this.router.navigate(["/"]);
    });
  }

  resetForm(formValue: NgForm) {
    formValue.reset();
  }

}
