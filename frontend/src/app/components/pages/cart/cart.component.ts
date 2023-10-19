import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ICart } from 'src/app/shared/models/cart.interface';
import { ICartItem } from 'src/app/shared/models/cartItem.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cart!: ICart;

  constructor(private cartService: CartService) {
    cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });
  }

  removeItem(cartItem: ICartItem) {
    console.log(cartItem);
    this.cartService.removeFood(cartItem.food.id);
  }

  changeQuantity(cartItem: ICartItem, quantity: number) {
    this.cartService.changeQuantity(cartItem.food.id, quantity);
  }
}
