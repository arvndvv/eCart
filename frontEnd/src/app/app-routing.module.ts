import { CartComponent } from './components/cartContainer/cart/cart.component';
import { AuthenticateGuard } from './authenticate.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import  {LoginComponent} from './components/user/login/login.component';
import  {RegisterComponent} from './components/user/register/register.component';
import {ListComponent} from './components/products/list/list.component';
import { CreateNewComponent } from './components/products/create-new/create-new.component';
// import {AuthenticateGuard} from './authenticate.guard'
const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
{path:'login',component:LoginComponent},
{path:'register',component:RegisterComponent},
{path:'products',component:ListComponent,canActivate:[AuthenticateGuard],
children:[
  {path:'create-new',component:CreateNewComponent}
]},
{path:'cart',component:CartComponent,canActivate:[AuthenticateGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
