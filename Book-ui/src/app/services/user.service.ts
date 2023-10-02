import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment.dev'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  addUser(body: any){
    let url = environment.USER_BASE_URL + environment.USER.ADD_USER;
    console.log("API call: ", url);
    console.log("ServiceBody", body)
    return this.httpClient.post(url,body);
  }

  login(id:string){
    let url = environment.USER_BASE_URL + environment.USER.GET_USER +id;
    console.log("API call: ", url);
    return this.httpClient.get(url);
  }

  getUser(){
    let url = environment.USER_BASE_URL + environment.USER.GET_ALL_USER
    console.log("API call: ", url);
    return this.httpClient.get(url);
  }

  searchUser(id: string){
    let url = environment.USER_BASE_URL + environment.USER.SEARCH_USER + id
    console.log("API call: ", url);
    return this.httpClient.get(url);
  }
}
