import { IFood } from './food.interface';

export class ICartItem {
  constructor(public food: IFood) {}
  quantity: number = 1;
  price: number = this.food.price;
}
