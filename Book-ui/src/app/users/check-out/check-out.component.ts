import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { MyOrderService } from 'src/app/services/my-order.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  email: any;
  displayName: string | null;
  currentDate: Date;
  pipe: any;
  changedDate: any;
  InvoiceTime: any;
  cartData: any;
  cartItem: any;
  cartItemCount: any;
  subTotal: number = 0;
  grandTotal: number;
  shipping: number = 40;
  orderItem: any;
  order: any = [];
  myOrderItem: any = [];
  orderId: String | null;

  constructor(private router: Router, private cartService: CartService, private myOrderService: MyOrderService) {


  }

  ngOnInit(): void {
    this.email = localStorage.getItem("email");
    this.displayName = localStorage.getItem("name");
    this.getCartItem();
    /** Current Date */
    this.currentDate = new Date();
    this.changedDate = '';
    this.pipe = new DatePipe('en-US');
    let ChangedFormat = this.pipe.transform(this.currentDate, 'EE, MMMM d y');
    let ChangedTimeFormat = this.pipe.transform(this.currentDate, 'h:mm:ss a');
    this.changedDate = ChangedFormat;
    this.InvoiceTime = ChangedTimeFormat;
    console.log(this.changedDate);

    /** Generation Order Id */
    this.orderId = this.generateOrderID();

  }

  
  /** items in cart */
  getCartItem(){
    this.cartService.getCartItem(this.email).subscribe((data) => {
      this.cartData = data;
      console.log(this.cartData);
      this.cartItem = this.cartData.result[0].cartInfo;
      this.orderItem = this.cartData.result[0].cart;
      console.log(this.cartItem);
      this.cartItemCount = this.cartItem.length;
      console.log(this.cartItemCount);
    
    for (let i = 0; i < this.cartItemCount; i++) {
      this.subTotal += this.cartItem[i].Price;
      console.log(this.cartItem[i].Price);
    }
    this.grandTotal = this.subTotal + this.shipping;
  });
  }

  /** Sigout function  ******/
  signingOut() {
    if (window.confirm("Are you sure you want to log out?")) {
      this.displayName = null;
      localStorage.clear();
      this.router.navigate(['/home']);
    }
  }
  generateOrderID(): string {
    const orderDate = new Date();
    const month = (orderDate.getMonth() + 1).toString().padStart(2, '0'); // Get the month as a two-digit string
    const date = orderDate.getDate().toString().padStart(2, '0'); // Get the date as a two-digit string
    const hour = orderDate.getHours().toString().padStart(2, '0'); // Get the hour as a two-digit string
    const minutes = orderDate.getMinutes().toString().padStart(2, '0'); // Get the minutes as a two-digit string
    const userNameSubstring = this.displayName?.replace(/\s+/g, '').substring(0, 3); // Remove spaces and take the first 3 characters of the user's name
    const orderID = `${userNameSubstring}-${month}${date}-${hour}${minutes}`;
    return orderID;
  }

  /*** My order details */
  orderDetail(){

    for (let i = 0; i < this.cartItemCount; i++) {
      this.order[i] = this.cartItem[i]._id;
    }
    const postBody= {
      id: this.email,
      orderId: this.orderId,
      quantity:this.cartItemCount,
      myOrderItem: this.order,
      amount: this.grandTotal

    }
    const id={
      email: this.email
    }

    console.log(postBody);
    this.myOrderService.addItemOrder(postBody).subscribe((data) =>{
      window.alert("Order Placed Successfully");
      this.cartService.removeAllItemFromCart(id).subscribe();
      this.router.navigate(["../book"]);
    });

  }
}
 

