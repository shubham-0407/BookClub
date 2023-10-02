import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { NgbModal, NgbModalConfig, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../services/cart.service';
import { MyOrderService } from '../services/my-order.service';


@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


	constructor(private userService: UserService, private cartService: CartService, private myOrderService: MyOrderService, public router: Router, private modalService: NgbModal, config: NgbModalConfig) {
		// customize default values of modals used by this component tree
		config.backdrop = 'static';
		config.keyboard = false;

	}

	displayName: string | null;
	ngOnInit() {
		this.displayName = localStorage.getItem("name");
		console.log("display name: " + this.displayName);
	}

	/************ modal ***************/
	openSignIn(login: any) {
		this.modalService.open(login, { ariaLabelledBy: 'modal-basic-title' });
	}
	openSignUp(register: any) {
		this.modalService.open(register);
	}


	/************ login ***************/
	email: string = "";
	password: string = "";
	data: any;
	profileName: string = "";
	userId: string = "";

	signInForm(formValue: NgForm) {
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


	/*** Register */
	_id: string = "";
	firstName: string = "";
	lastName: string = "";
	value: any = "";

	addUser(formValue: NgForm) {
		/*** Adding user */
		const postBody = {
			_id: formValue.value.email,
			firstName: formValue.value.firstName,
			lastName: formValue.value.lastName,
			email: formValue.value.email,
			password: formValue.value.password
		}
		this.userService.addUser(postBody).subscribe(data => {
			console.log(data);
			this.value = data;
			this.profileName = this.value.userDetail.firstName;
			this.userId = this.value.userDetail.email;
			localStorage.setItem("name", this.profileName);
			localStorage.setItem("email", this.userId);
			window.alert("Registered Successfully");

			// adding empty cart for new user in cart collection
			const cart_order_Body = {
				email: this.userId
			}
			this.cartService.createCart(cart_order_Body).subscribe(data => {
				console.log(data);

			})

			// adding empty order for new user in my-order collection
			this.myOrderService.createOrder(cart_order_Body).subscribe(data => {
				console.log(data);

			});

			formValue.reset();

			this.router.navigate(["/book"]);

		}, (err) => {

			window.alert("User already exists");
			console.log("Unable to add", err);
		})
	}
	/** Sigout function  ******/
	signingOut() {
		if (window.confirm("Are you sure you want to log out?")) {
			this.displayName = null;
			localStorage.clear();
			this.router.navigate(['/home']);

		}
	}

}
