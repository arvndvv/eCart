import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  // num:number=20000.23342;

  constructor(private userService: UserService, private router: Router) {
    // if (!userService.verify()) {
    //   // console.log('aaaaa');
    //   this.router.navigateByUrl('/products');
    // }
    userService
      .verify()
      .then((res) => {
        if (res) {
          this.router.navigateByUrl('/products');
        }
      })
      .catch();
  }

  ngOnInit(): void {}
  onLogin() {
    const user = {
      email: this.email,
      password: this.password,
    };
    this.userService.login(user).subscribe((res) => {
      //  console.log(res);

      if (res.status) {
        // console.log(res);

        localStorage.setItem('x-access-token', res.token);
        localStorage.setItem('userData', JSON.stringify(res.data));
        this.router.navigateByUrl('products');
      } else {
        console.log(res.error);
      }
    });
  }
}
