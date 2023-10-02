import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { CheckOutComponent } from './check-out/check-out.component';

const routes: Routes = [
  {path: '', component: UsersComponent},
  { path: 'viewCart', component: ViewCartComponent },
  {path: 'myOrder', component: MyOrderComponent},
  {path: 'checkOut', component: CheckOutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
