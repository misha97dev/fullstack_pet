import { Schema, Types, model } from "mongoose";
import { IFood, IFoodSchema } from "./food.model";
import { OrderStatusEnum } from "../constants/orderStatus";

export interface ILatLng {
  lat: string;
  lng: string;
}

export const ILatLngSchema = new Schema<ILatLng>({
  lat: { type: String, required: true },
  lng: { type: String, required: true },
});

export interface IOrderItem {
  food: IFood;
  quantity: number;
  price: number;
}

export const IOrderItemSchema = new Schema<IOrderItem>({
  food: { type: IFoodSchema, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

export interface IOrder {
  id: string;
  items: IOrderItem[];
  totalPrice: number;
  name: string;
  address: string;
  paymentId: string;
  createdAt: Date;
  status: OrderStatusEnum;
  addressLatLng: ILatLng;
  user: Types.ObjectId;
  updatedAt: Date;
}

export const IOrderSchema = new Schema<IOrder>(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    addressLatLng: { type: ILatLngSchema, required: true },
    paymentId: { type: String },
    totalPrice: { type: Number, required: true },
    items: { type: [IOrderItemSchema], required: true },
    status: { type: String, default: OrderStatusEnum.NEW },
    user: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const OrderModel = model("order", IOrderSchema);
