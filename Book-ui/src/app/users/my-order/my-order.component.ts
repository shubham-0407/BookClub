import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyOrderService } from 'src/app/services/my-order.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  displayName: String | null;
  email: String | null;
  myOrderData: any;

  constructor(private router: Router, private myOrderService: MyOrderService) { }

  ngOnInit(): void {
    this.email = localStorage.getItem("email");
    this.displayName = localStorage.getItem("name");
  }

  // getOrderItem(){

  //   this.myOrderService.viewMyOrder(this.email).subscribe((data)=>{
  //     this.myOrderData = data;
      

  //   })
  // }

  signingOut() {
    if (window.confirm("Are you sure you want to log out?")) {
      this.displayName = null;
      localStorage.clear();
      this.router.navigate(['/home']);
    }
  }
}
