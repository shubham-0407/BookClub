import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BooksComponent } from './books.component';
import { SearchBooksComponent } from './search-books/search-books.component';
import { ViewBookComponent } from './view-book/view-book.component';
import { CartComponent } from './cart/cart.component';
import { BuyNowComponent } from './buy-now/buy-now.component';

const routes: Routes = [
  { path: '', component: BooksComponent },
  { path: 'view/:id', component: ViewBookComponent },
  { path: 'search', component: SearchBooksComponent },
  {path: 'cart', component: CartComponent},
  {path: 'buyNow', component: BuyNowComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
