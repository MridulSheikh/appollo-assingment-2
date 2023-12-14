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

export const orderServices = {
  createOrder,
};
