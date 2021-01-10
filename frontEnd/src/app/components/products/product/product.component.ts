import { UserService } from 'src/app/services/user.service';
import { logging } from 'protractor';
import { Product } from './../../../models/Product';
import { Component, Input, OnInit, Output ,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

error:string='';  
  quantity:number=1;
  
@Input() product:Product;
@Output() addedItem:EventEmitter<any>=new EventEmitter();
  constructor(private userService:UserService) { 
    userService.verify()
  }
 errorClass={'error':true,'errorShow':!!this.error}

  ngOnInit(): void {
  }
  addToCart(){
    // console.log(this.product);
    this.addedItem.emit({productId:this.product._id,quantity:this.quantity});
// alert('')
  }
  reduceCount():void{
if(this.quantity>1){
  this.quantity--;
}
else{
  this.error="minimum 1 item required!";
  this.errorClass={'error':true,'errorShow':!!this.error}

  setTimeout(()=>{
    this.error="";
    this.errorClass={'error':true,'errorShow':!!this.error}
  
  },2000)
  
}
  }
  increaseCount():void{
    if(this.quantity<99){
      this.quantity++;
    }
    else{
      this.error="maximum 99 item can be added!";
      this.errorClass={'error':true,'errorShow':!!this.error}
    
      setTimeout(()=>{
        this.error="";
        this.errorClass={'error':true,'errorShow':!!this.error}
      
      },2000)
    }
  }
  quantityEdited():void{
  if(this.quantity<1 || this.quantity>=100 || this.quantity == null){
    console.log(this.quantity)
this.quantity=1;
console.log(this.quantity)
this.error="quantity must be between 1 and 99";
this.errorClass={'error':true,'errorShow':!!this.error}

setTimeout(()=>{
  this.error="";
  this.errorClass={'error':true,'errorShow':!!this.error}

},2000)
  }
  
  }

}
