import { AuthInterceptorInterceptor } from './http-interceptors/auth-interceptor.interceptor';
import { ProductsService } from './services/products.service';
import { UserService } from 'src/app/services/user.service';
import { AuthguardServiceService } from './authguard-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ListComponent } from './components/products/list/list.component';
import { CreateNewComponent } from './components/products/create-new/create-new.component';
import { CartComponent } from './components/cartContainer/cart/cart.component';
import { ProductComponent } from './components/products/product/product.component';
import { NumbersOnlyDirective } from './numbers-only.directive';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './layout/header/header.component';
import { CartItemComponent } from './components/cartContainer/cart-item/cart-item.component';
// import { LotteComponent } from './components/cartContainer/lotte/lotte.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ListComponent,
    CreateNewComponent,
    CartComponent,
    ProductComponent,
    NumbersOnlyDirective,
    HeaderComponent,
    CartItemComponent,
    // LotteComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true,
    },
    AuthguardServiceService,
    UserService,
    ProductsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
