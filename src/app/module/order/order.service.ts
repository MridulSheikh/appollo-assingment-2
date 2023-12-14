import { IOrder } from '../user/user.interface';
import { User } from '../user/user.model';

const createOrder = async (userId: string, payload: IOrder) => {
  const isUser = await User.isUserExists(userId);
  if (!isUser?.fullName) {
    throw new Error('User not found!');
  }
  const result = await User.updateOne(
    { userId },
    {
      $push: { orders: payload },
    },
    {
      upsert: true,
    },
  );
  if (result.modifiedCount === 0) throw new Error('order not created!');
  return result;
};

const getOrderForSpacificUser = async (userId: string) => {
  const isUser = await User.isUserExists(userId);
  if (!isUser?.fullName) {
    throw new Error('User not found!');
  }
  const user = await User.findOne({ userId });
  const orders = user?.orders;
  if (orders?.length === 0)
    throw new Error('this User does not have any order');
  return orders;
};

const getTotalPriceForSpacipicUser = async (userId: string) => {
  const isUser = await User.isUserExists(userId);
  if (!isUser?.fullName) {
    throw new Error('User not found!');
  }
  const user = await User.findOne({ userId });
  const orders = user?.orders;
  if (orders?.length === 0)
    throw new Error('this User does not have any order');
  let totalPrice = 0;
  orders?.forEach((order: IOrder) => {
    totalPrice += order.price * order.quantity;
  });
  return totalPrice;
};

export const orderServices = {
  createOrder,
  getOrderForSpacificUser,
  getTotalPriceForSpacipicUser,
};
