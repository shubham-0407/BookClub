import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) { }


  /** Intialize cart */
  createCart(body: any){
    let url = environment.CART_BASE_URL + environment.CART.REG_CART;
    console.log("API call: ", url);
    return this.httpClient.post(url,body);
  }

  addItem(body: any){
    // let url = environment.BOOK_BASE_URL + environment.BOOK.ADD_TO_CART;
    let url = environment.CART_BASE_URL + environment.CART.ADD_TO_CART;
    console.log("API call: ", url);
    return this.httpClient.put(url,body);
  }

  getCartItem(email: string){
     let url = environment.CART_BASE_URL + environment.CART.VIEW_CART +email;
    console.log("API call: ", url);
    return this.httpClient.get(url);
  }

  removeItemFromCart(body: any){
    let url = environment.CART_BASE_URL + environment.CART.DELETE_CART_ITEM;
    console.log("API call: ", url);
    return this.httpClient.put(url,body);
  }

  removeAllItemFromCart(body:any){
    console.log(body);
    let url = environment.CART_BASE_URL + environment.CART.DELETE_CART;
    console.log("API call: ", url);
    return this.httpClient.put(url,body);
  }
}
