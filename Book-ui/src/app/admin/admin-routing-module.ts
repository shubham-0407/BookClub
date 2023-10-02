import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBooksComponent } from './add-books/add-books.component';
import { AdminComponent } from './admin.component';
import { DeleteBookComponent } from './delete-book/delete-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { SellerDetailComponent } from './seller-detail/seller-detail.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

const routes: Routes = [
  {path: '', component: AdminComponent},
  { path: 'addBook', component: AddBooksComponent },
  { path: 'editBook/:id', component: EditBookComponent },
  { path: 'deleteBook/:id', component: DeleteBookComponent },
  {path: 'userDetail', component: UserDetailComponent},
  {path: 'sellerDetail', component: SellerDetailComponent},
  {path: 'orderDetail', component: OrderDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
