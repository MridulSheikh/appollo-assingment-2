import { User } from './user.model';
import { IUser } from './user.interface';

const createUserServiceDB = async (user: IUser) => {
  return await User.create(user);
};

const getAllUserServiceDB = async () => {
  const result = await User.aggregate([
    {
      $project: {
        _id: 0,
        username: 1,
        fullName: {
          firstName: 1,
          lastName: 1,
        },
        age: 1,
        email: 1,
        address: {
          street: 1,
          city: 1,
          country: 1,
        },
      },
    },
  ]);
  return result;
};

const getSingleUserDB = async (userId: string) => {
  const result = await User.isUserExists(userId);
  // property does not exitst in result object then throw this `user not found!` error
  if (!result?.fullName) {
    throw new Error('User not found!');
  }
  return result;
};

const updateSignleUserDb = async (userId: string, body: IUser) => {
  const isUser = await User.isUserExists(userId);
  if (!isUser?.fullName) throw new Error('User not found!');
  const result = await User.updateOne({ userId: parseInt(userId) }, body);
  if (result.modifiedCount === 0)
    throw new Error(
      'User found but not updated!. please make sure provide a unique value for unique property',
    );
  return { ...result, data: { ...isUser, ...body } };
};

const deleteSingleUserDB = async (userId: string) => {
  const isUser = await User.isUserExists(userId);
  if (!isUser?.fullName) throw new Error('User not found!');
  const result = await User.deleteOne({ userId });
  return result;
};

export const userServices = {
  createUserServiceDB,
  getAllUserServiceDB,
  getSingleUserDB,
  updateSignleUserDb,
  deleteSingleUserDB,
};
