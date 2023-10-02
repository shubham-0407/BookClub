import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  data: any;
  profileName: any;
  userId: any;
  isLogin: boolean = true;
  constructor(private userService: UserService, public router: Router) { }

  ngOnInit(): void { }

  login(formValue: NgForm) {
    console.log(formValue.value);
    const email = formValue.value.email;
    const pass = formValue.value.password;
    console.log("Email:" + email)

    if (email === "admin@gmail.com" && pass === "admin") {
      localStorage.setItem("name", "Admin");
      localStorage.setItem("email", email);
      window.alert("Admin Login successful");
      formValue.reset();
      this.router.navigate(['/admin']);
    }
    else {
      this.userService.login(this.email).subscribe(data => {
        this.data = data;
        console.log(this.data)

        if (this.data.result === null) {
          console.log("User does not exist")
          window.alert("User does not exist. Try to sign up.");
          formValue.reset();
          this.router.navigate(['/register']);
        }

        else if (email === this.data.result.email && pass === this.data.result.password) {
          this.profileName = this.data.result.firstName;
          this.userId = this.data.result.email;
          localStorage.setItem("name", this.profileName);
          localStorage.setItem("email", this.userId);

          window.alert("Login successful");
           
           this.router.navigate(['/book']);

        }

        else {
          console.log("Wrong password")
          window.alert("Wrong password");

          formValue.reset();

        }
      })
    }
  }

  // reloadComponent() {
  //   this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  //   this.router.onSameUrlNavigation = 'reload';
  //   this.router.navigate(["/book"]);
  // }

  
}