import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { ToastrService } from 'ngx-toastr';

let httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'skip-interceptor': 'true',
  }),
};
// if(session.loggedIn){
//    httpOptions={
//     headers:new HttpHeaders({
//       'x-access-token':session.token,
//       'Access-Control-Allow-Origin': '*'
//     })
//   }
// }

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userUrl: string = '/user';
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  login(user: any): Observable<any> {
    // console.log(user);

    return this.http.post<any>(`${this.userUrl}/login`, user, httpOptions);
  }
  register(user: User): Observable<any> {
    // console.log(user);
    return this.http.post<User>(`${this.userUrl}/register`, user, httpOptions);
  }
  async verify() {
    let jwt,
      ret,
      url = 'http://localhost:4000/user/';
    // console.log('aaa');
    if ((jwt = localStorage.getItem('x-access-token'))) {
      // console.log('jwt');

      try {
        const resp = await this.http.get(url).toPromise();
        return true;
      } catch (error) {
        return false;
      }
      // .subscribe(
      //   async (res) => {
      //     // console.log('aa');
      //     if (res) {
      //       // console.log('aa');
      //       return true;
      //     }
      //   },
      //   (err) => {
      //     this.toastr.error(err.error.message, 'Error');
      //     console.log('asa');
      //     localStorage.clear();

      //     this.router.navigateByUrl('login');
      //     return false;
      //   }
      // );
    }
    return false;
  }
}
