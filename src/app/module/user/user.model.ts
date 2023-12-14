/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import {
  IAddress,
  IOrder,
  IUser,
  IUserName,
  UserModel,
} from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userNameSchema = new Schema<IUserName>(
  {
    firstName: {
      type: String,
      required: [true, 'first name required '],
    },
    lastName: {
      type: String,
      required: [true, 'last name required '],
    },
  },
  {
    _id: false,
  },
);

const addressSchema = new Schema<IAddress>(
  {
    street: {
      type: String,
      required: [true, 'street is required'],
    },
    city: {
      type: String,
      required: [true, 'city is required'],
    },
    country: {
      type: String,
      required: [true, 'country is required'],
    },
  },
  {
    _id: false,
  },
);

const orderSchema = new Schema<IOrder>(
  {
    productName: {
      type: String,
      required: [true, 'product name is required'],
    },
    price: {
      type: Number,
      required: [true, 'price is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'quantity is required'],
    },
  },
  {
    _id: false,
  },
);

const userSchema = new Schema<IUser, UserModel>(
  {
    userId: {
      type: Number,
      required: [true, 'userId is required'],
      unique: true,
    },
    username: {
      type: String,
      required: [true, 'username is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      select: false,
    },
    fullName: {
      type: userNameSchema,
      required: [true, 'full name is mustbe require'],
    },
    age: {
      type: Number,
      required: [true, 'age is required'],
    },
    email: {
      type: String,
      required: [true, 'email is required'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    hobbies: {
      type: [String],
      required: [true, 'hobbies is required'],
    },
    address: {
      type: addressSchema,
      required: [true, 'address is required'],
    },
    orders: {
      type: [orderSchema],
    },
  },
  {
    versionKey: false,
  },
);

// this pre middleware for convert password hash
userSchema.pre<IUser>('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

// check user is exist
userSchema.statics.isUserExists = async function (userId: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = await User.aggregate([
    { $match: { userId: parseInt(userId) } },
  ]).project({
    _id: 0,
    userId: 1,
    username: 1,
    fullName: {
      firstName: 1,
      lastName: 1,
    },
    age: 1,
    email: 1,
    isActive: 1,
    hobbies: 1,
    address: {
      street: 1,
      city: 1,
      country: 1,
    },
  });
  if (result.length == 0) {
    throw new Error('User not found!');
  }
  return result[0] as IUser;
};

export const User = model<IUser, UserModel>('User', userSchema);
