import { Injectable } from '@angular/core';
import { ICart } from '../shared/models/cart.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { IFood } from '../shared/models/food.interface';
import { ICartItem } from '../shared/models/cartItem.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = this.getLocalStorageCart();
  private cartSubject: BehaviorSubject<ICart> = new BehaviorSubject(this.cart);

  constructor() {}

  getCart(): ICart {
    return this.cartSubject.value;
  }

  addFood(food: IFood): void {
    let cartItem = this.cart.items.find((item) => item.food.id === food.id);
    if (cartItem) return;
    this.cart.items.push(new ICartItem(food));
    this.setLocalStorageCart();
  }

  removeFood(id: string): void {
    this.cart.items = this.cart.items.filter((item) => item.food.id !== id);
    console.log(this.cart.items);
    this.setLocalStorageCart();
  }

  changeQuantity(id: string, quantity: number) {
    let cartItem = this.cart.items.find((item) => item.food.id === id);
    if (!cartItem) return;
    cartItem.quantity = cartItem.quantity + quantity;
    if (cartItem.quantity === 0) return this.removeFood(id);
    cartItem.price = cartItem.quantity * cartItem.food.price;
    this.setLocalStorageCart();
  }

  clearCart() {
    this.cart = new ICart();
    this.setLocalStorageCart();
  }

  getCartObservable(): Observable<ICart> {
    return this.cartSubject.asObservable();
  }

  private setLocalStorageCart(): void {
    this.cart.totalPrice = this.cart.items.reduce(
      (sum, currItem) => sum + currItem.price,
      0
    );
    this.cart.totalCount = this.cart.items.reduce(
      (sum, currItem) => sum + currItem.quantity,
      0
    );
    const cartJson: string = JSON.stringify(this.cart);
    localStorage.setItem('cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getLocalStorageCart(): ICart {
    const cartJson = localStorage.getItem('cart');
    return cartJson ? JSON.parse(cartJson) : new ICart();
  }
}
