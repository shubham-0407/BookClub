import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
// import { AddBooksComponent } from './add-books/add-books.component';
// import { DeleteBookComponent } from './delete-book/delete-book.component';
import { SearchBooksComponent } from './search-books/search-books.component';
// import { EditBookComponent } from './edit-book/edit-book.component';
import { ViewBookComponent } from './view-book/view-book.component';
// import { AdminComponent } from './admin/admin.component';
import { BuyNowComponent } from './buy-now/buy-now.component';
import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [
    BooksComponent,
    // AddBooksComponent,
    // DeleteBookComponent,
    SearchBooksComponent,
    // EditBookComponent,
    ViewBookComponent,
    // AdminComponent,
    BuyNowComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    FormsModule
  ]
})
export class BooksModule { }
