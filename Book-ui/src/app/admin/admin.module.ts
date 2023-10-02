import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
import { AdminRoutingModule } from './admin-routing-module';
import { AddBooksComponent } from './add-books/add-books.component';
import { DeleteBookComponent } from './delete-book/delete-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { AdminComponent } from './admin.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { SellerDetailComponent } from './seller-detail/seller-detail.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';



@NgModule({
  declarations: [
    AddBooksComponent,
    DeleteBookComponent,
    EditBookComponent,
    AdminComponent,
    UserDetailComponent,
    SellerDetailComponent,
    OrderDetailComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
