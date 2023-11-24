import { Model } from 'mongoose';

export type IUserName = {
  firstName: string;
  lastName: string;
};

export type IAddress = {
  street: string;
  city: string;
  country: string;
};

export type IOrder = {
  productName: string;
  price: number;
  quantity: number;
};

export interface IUser {
  userId: number;
  username: string;
  password: string;
  fullName: IUserName;
  age: number;
  email: string;
  isActive?: boolean;
  hobbies: Array<string>;
  address: IAddress;
  orders?: Array<IOrder>;
}

// for creating static

export interface UserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(userId: string): Promise<IUser | null>;
}
