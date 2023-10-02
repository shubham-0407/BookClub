import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  userResult: any;
  userList: any;
  searchKeyword: any;
  searchResult: any;
  
  constructor(private userService: UserService) { 
    this.getUserList()
  }

  ngOnInit(): void {
  }

  getUserList(){
    this.userService.getUser().subscribe((data) => {
      this.userResult = data;
      this.userList = this.userResult.result;
      console.log(this.userList);
    });
  }

   /** Search book record */
   Search(formValue: NgForm){
    this.searchKeyword = formValue.value.searchKeyword;
    this.userService.searchUser(this.searchKeyword).subscribe((data) =>
      {this.searchResult = data;
      this.userList = this.searchResult.result;
      console.log(this.userList);
    });

}
}
