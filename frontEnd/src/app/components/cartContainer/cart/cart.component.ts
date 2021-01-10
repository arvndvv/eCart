import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../services/cart.service';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private cdRef: ChangeDetectorRef,
    private cartService: CartService,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService
  ) {
    //  let verified=this.userService.verify()
    this.userService.verify();
  }
  cartData: any;
  pop: boolean = false;
  items: any;
  disable: boolean = false;
  @ViewChild('lottie') lottie: ElementRef;

  cartInfoUpdate(): void {
    this.cartService.showCart().subscribe(
      (cart) => {
        if (cart.data.items.length === 0) {
          this.disable = true;
          this.toastr.info('cart is empty', 'Info');
        }
        // console.log(cart);
        this.cartData = cart.data;
        this.items = cart.data.items;
        // console.log(this.cartData)
      },
      (err) => {
        console.log('cart empty');
        console.log(err);
      }
    );
  }

  purchase(): void {
    this.pop = true;

    this.lottie.nativeElement.play();
    setTimeout(() => {
      this.disable = true;
    }, 3500);
    this.toastr.success('Items Purchased', 'Success');
    this.cartService.emptyCart().subscribe(
      (data) => {
        // console.log(data);
        this.cartInfoUpdate();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  ngOnInit(): void {
    this.cartInfoUpdate();
  }

  removeItem(id): any {
    // console.log(id);
    // console.log('remove item');
    this.cartService.removeItem(id).subscribe(
      (success) => {
        this.cartService.showCart().subscribe(
          (cart) => {
            if (cart.data.items.length === 0) {
              this.disable = true;
              this.toastr.info('cart is empty', 'Info');
            }
            // console.log(cart);
            this.cartData = cart.data;
            this.items = cart.data.items;
            // console.log(this.cartData)
          },
          (err) => {
            console.log('cart empty');
            console.log(err);
          }
        );

        this.toastr.success('Item Removed', 'Success');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  reduceItem(id): any {
    // console.log('reduce');
    this.cartService.reduceItem(id).subscribe(
      (success) => {
        this.cartInfoUpdate();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  increaseItem(update): any {
    this.cartService.add(update).subscribe(
      (success) => {
        this.cartInfoUpdate();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
