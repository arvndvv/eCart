import { logging } from 'protractor';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
user=JSON.parse(localStorage.getItem('userData')) ;

  constructor(private router:Router) { }

  ngOnInit(): void {

  }
  logout():void{
localStorage.clear();
this.router.navigateByUrl('/login');
  }

}
