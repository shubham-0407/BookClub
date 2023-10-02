import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-buy-now',
  templateUrl: './buy-now.component.html',
  styleUrls: ['./buy-now.component.css']
})
export class BuyNowComponent implements OnInit {
  bookId: string = '';
  bookDetails: any;
  book: any;
  subTotal: number = 0;
  total!: number;
  shipping: number = 40;
  billing: boolean = false;
  userId!: string | null;


  constructor(private bookService: BookService, private activatedRoute: ActivatedRoute, public router: Router) { }

  currDate: Date = new Date();
  userName: string | null = localStorage.getItem("name");
  address: string = "";
  
  ngOnInit(): void {
    this.userId = localStorage.getItem("email");
    console.log(this.userId);
    console.log(this.userName);
    this.activatedRoute.params.subscribe(data => {
      this.bookId = data["id"];
      console.log(this.bookId)
    })
  }

}
