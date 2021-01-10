import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthguardServiceService {

  constructor(private http:HttpClient) { }
  gettoken(){
    return localStorage.getItem('x-access-token')
  }

}

