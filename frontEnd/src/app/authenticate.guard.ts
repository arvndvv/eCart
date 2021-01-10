import { AuthguardServiceService } from './authguard-service.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateGuard implements CanActivate {
  constructor(private Authguardservice:AuthguardServiceService,private router:Router){}
  canActivate():boolean{
    // this.router.navigateByUrl("login");
    // return false
    // console.log(this.router.url)
if(!this.Authguardservice.gettoken()){
 
  
    this.router.navigateByUrl("/login");

 
  return false
}
return true
// return !!this.Authguardservice.gettoken();
// else{
//   this.Authguardservice.verify(verifyUrl).subscribe(data=>{
  

//     this.router.navigateByUrl("/product");
//       return true
//   },err=>{
// console.log(err)
//   })
// }
  }
  
  
}
