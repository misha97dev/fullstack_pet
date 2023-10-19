import { ICartItem } from './cartItem.interface';
export class ICart {
  items: ICartItem[] = [];
  totalPrice: number = 0;
  totalCount: number = 0;
}
