import { LatLng } from 'leaflet';
import { ICartItem } from './cartItem.interface';

export class IOrder {
  id!: number;
  items!: ICartItem[];
  totalPrice!: number;
  name!: string;
  address!: string;
  paymentId!: string;
  createdAt!: string;
  status!: string;
  addressLatLng?: LatLng;
}
