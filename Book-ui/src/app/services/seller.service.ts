import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private httpClient: HttpClient) { }

  addSeller(body: any){
    let url = environment.SELLER_BASE_URL + environment.SELLER.ADD_SELLER;
    console.log("API call: ", url);
    console.log("ServiceBody", body)
    return this.httpClient.post(url,body);
  }

  getSeller(){
    let url = environment.SELLER_BASE_URL + environment.SELLER.GET_ALL_SELLER;
    console.log("API call: ", url);
    return this.httpClient.get(url);
  }

  searchSeller(id: string){
    let url = environment.SELLER_BASE_URL + environment.SELLER.SEARCH_SELLER +id;
    console.log("API call: ", url);
    return this.httpClient.get(url);
  }

}
