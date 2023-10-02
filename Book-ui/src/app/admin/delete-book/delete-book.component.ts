import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css']
})
export class DeleteBookComponent {
  bookId: string = '';
  bookDetails: any;
  book: any;
  constructor(private activatedRoute: ActivatedRoute,
    private bookService: BookService, public router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      this.bookId = data["id"];
      console.log(this.bookId)
    })
    if (window.confirm("Are you sure you want to delete?")) {
      this.bookService.deleteBook(this.bookId).subscribe(data => {
        this.book = data;
        console.log(this.book)
        this.bookDetails = this.book.result;
        window.alert("Book Deleted Successfully");
      })
    }
    this.router.navigate(["/admin"]);
  }
}