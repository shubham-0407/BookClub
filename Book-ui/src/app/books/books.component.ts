import { Component } from '@angular/core';
import {BookService} from '../services/book.service'
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {
  bookResult: any;
  bookList: any;
  searchResult: any;
  searchKeyword: any;
  email: any ;
  cart: any;
  cartData: any;
  cartItemCount: any;
  cartItem: any;
  alert:boolean = false;

  constructor(private bookService: BookService, private cartService: CartService, private router: Router){
    this.getBooksList();
     
  }

   
  displayName: string | null;
	ngOnInit(){
		this.displayName = localStorage.getItem("name");
		console.log("display name: " + this.displayName);
    this.getCartItemLength();
	}
  

  /** Sigout function  ******/
  signingOut() {
		if (window.confirm("Are you sure you want to log out?")) {
		this.displayName = null;
		localStorage.clear();
		this.router.navigate(['/home']);
		}
	}

  /** Get List of books */
  getBooksList(){
    this.bookService.getBooks().subscribe((data) => {
      this.bookResult = data;
      this.bookList = this.bookResult.result;
      console.log(this.bookList);
    });
  }

  /** Search query book record */
  Search(formValue: NgForm){
    this.searchKeyword = formValue.value.searchKeyword;
    this.bookService.searchBook(this.searchKeyword).subscribe((data) =>
      {this.searchResult = data;
      this.bookList = this.searchResult.result;
      console.log(this.bookList);
    });
  }

  /***  Adding to cart */
  addToCart(item: any){
    this.email = localStorage.getItem("email");
    const cartBody = { 
      _id: this.email,
      bookId: item,
    }
    this.cartService.addItem(cartBody).subscribe(data => {
      this.cart = data;
      console.log("added")
      this.alert = true;
      this.cartItemCount++;
      window.alert("Book added to cart successfully");
      this.router.navigate(["../book"]);
    })
  }

  /** items in cart */
  getCartItemLength(){
    this.email = localStorage.getItem("email");
    this.cartService.getCartItem(this.email).subscribe((data) => {
      this.cartData = data;
      console.log(this.cartData);
      this.cartItem = this.cartData.result[0].cartInfo;
      this.cartItemCount = this.cartItem.length;
      console.log(this.cartItemCount);
    });
  }

  /*** close Alert */
  closeAlert(){
    this.alert = false;
  }

}
