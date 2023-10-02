import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {
  email: any;
  cartData: any;
  cartItem: any;
  cartItemCount: any;
  subTotal: number = 0;
  shipping: number = 50;
  grandTotal: number;
  displayName: string | null;

  constructor(private cartService: CartService, private router: Router) {
    
   }

  ngOnInit(): void {
    this.email = localStorage.getItem("email");
    this.displayName = localStorage.getItem("name");
    console.log(this.email);
    this.getCartItem();
  }

  /** items in cart */
  getCartItem(){
    this.cartService.getCartItem(this.email).subscribe((data) => {
      this.cartData = data;
      console.log(this.cartData);
      this.cartItem = this.cartData.result[0].cartInfo;
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


  /** Removing cart item */
  removeItem(list: any){
    const deleteBody = {
      _id: this.email,
      bookId: list
    }
    if (window.confirm("Are you sure you want to delete?")) {
      this.cartService.removeItemFromCart(deleteBody).subscribe(data => {
        this.reloadComponent();
      })
    }
    this.reloadComponent();
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(["../../user/viewCart"]);
}

  /**  Removing all cart items  */
  emptycart(){
     const deleteCart= {
      email: this.email
     }
     console.log("Cart id: "+deleteCart);
     console.log("Empty card function called");
    if (window.confirm("Are you sure you want to delete?")) {
      this.cartService.removeAllItemFromCart(deleteCart).subscribe(() => {
        
      });
      this.router.navigate(["../../book"]);
       
    }
    this.router.navigate(["../../book"]);
  }

  /** Sigout function  ******/
  signingOut() {
		if (window.confirm("Are you sure you want to log out?")) {
		this.displayName = null;
		localStorage.clear();
		this.router.navigate(['/home']);
		}
	}
}
