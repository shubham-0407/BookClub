import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CartService } from '../services/cart.service';
import { MyOrderService } from '../services/my-order.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  _id: string = "";
   email: string = "";
  firstName: string = "";
  lastName: string = "";
  password: string = ""
  profileName: any;
  data: any;
  userId: any;
  value: any = "";
  displayName: string | null;

  constructor(private userService: UserService, private cartService: CartService, public router: Router, private myOrderService: MyOrderService) { }

  ngOnInit(): void {
    this.displayName = localStorage.getItem("name");
    console.log("display name: " + this.displayName);
  }

  addUser(formValue: NgForm) {

    /*** Adding user */
    const postBody = {
      _id: formValue.value.email,
      firstName: formValue.value.firstName,
      lastName: formValue.value.lastName,
      email: formValue.value.email,
      password: formValue.value.password
    }
    this.userService.addUser(postBody).subscribe(data => {
      console.log(data);
      this.value = data;
      this.profileName = this.value.userDetail.firstName;
      this.userId = this.value.userDetail.email;
      localStorage.setItem("name", this.profileName);
      localStorage.setItem("email", this.userId);
      window.alert("Registered Successfully");

      // adding empty cart for new user in cart collection
      const cart_order_Body = {
        email: this.userId
      }
      this.cartService.createCart(cart_order_Body).subscribe(data => {
        console.log(data);
         
      })

      // adding empty order for new user in my-order collection
      this.myOrderService.createOrder(cart_order_Body).subscribe(data => {
        console.log(data);
         
      });

      formValue.reset();
       
       this.router.navigate(["/book"]);

    }, (err) => {

      window.alert("User already exists");
      console.log("Unable to add", err);
    })
  }

//   reloadComponent() {
//     this.router.routeReuseStrategy.shouldReuseRoute = () => false;
//     this.router.onSameUrlNavigation = 'reload';
//     this.router.navigate(["/book"]);
// }
}