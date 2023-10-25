import { Schema, model } from "mongoose";

export interface IUser {
  // id: string;
  email: string;
  password: string;
  name: string;
  address: string;
  isAdmin: boolean;
  token: string;
}

export const IUserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String },
    token: { type: String },
    isAdmin: { type: Boolean, default: false },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

export const UserModel = model<IUser>("user", IUserSchema);
