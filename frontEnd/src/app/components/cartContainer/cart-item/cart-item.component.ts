import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input()
  item: any;
  @Output() removedItem: EventEmitter<any> = new EventEmitter();
  @Output() reducedItem: EventEmitter<any> = new EventEmitter();
  @Output() increasedItem: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
  removeItem(event) {
    event.preventDefault();
    // console.log(this.item);
    this.removedItem.emit(this.item.productId._id);
  }
  reduceQuantity() {
    this.reducedItem.emit(this.item.productId._id);
    // console.log(this.item.productId._id);
  }
  increaseQuantity() {
    // this.item.quantity++;
    let update = {
      productId: this.item.productId._id,
      quantity: 1,
    };
    this.increasedItem.emit(update);

    // console.log(update);
  }
}
