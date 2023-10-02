import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { fromEventPattern } from 'rxjs';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-seller-detail',
  templateUrl: './seller-detail.component.html',
  styleUrls: ['./seller-detail.component.css']
})
export class SellerDetailComponent implements OnInit {
  sellerResult: any;
  sellerList: any;
  searchResult: any;
  searchKeyword: any;

  constructor( private sellerService: SellerService, private router: Router) { 
    this.getSellerList();
  }

  ngOnInit(): void {
  }

  getSellerList(){
    this.sellerService.getSeller().subscribe((data)=>{
      this.sellerResult = data;
      this.sellerList = this.sellerResult.result;
      console.log(this.sellerList);
    });
  }
  
  searchSeller(formValue: NgForm){
    this.searchKeyword = formValue.value.searchKeyword;
    this.sellerService.searchSeller(this.searchKeyword).subscribe((data)=> {
      this.searchResult = data;
      this.sellerList = this.searchResult.result;
      console.log(this.sellerList);
    });

  }

}
