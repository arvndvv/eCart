import { Router } from '@angular/router';
import { ToastRef, ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  uname: string;
  email: string;
  password: string;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  onReg() {
    const newUser = {
      name: this.uname,
      email: this.email,
      password: this.password,
      role: 'user',
    };
    this.userService.register(newUser).subscribe(
      (data) => {
        this.toastr.success('Account Created!', 'Success');
        setTimeout(() => {
          this.router.navigateByUrl('');
        }, 1000);
      },
      (err) => {
        this.toastr.error(err.data, 'Error');
      }
    );
  }
}
