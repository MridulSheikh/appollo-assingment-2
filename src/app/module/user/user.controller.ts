import { Request, Response } from 'express';
import { userServices } from './user.service';
import { userVlidationSchema } from './user.validation';

const createUserControllerDB = async (req: Request, res: Response) => {
  try {
    const userData = await userVlidationSchema.validateAsync(req.body);
    const result = await userServices.createUserServiceDB(userData);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

const getAllUserControllerDB = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUserServiceDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

const getSingleUserDB = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getSingleUserDB(req.params.userId);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'User not found!',
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

const updatSingleUserControllerDB = async (req: Request, res: Response) => {
  try {
    const result = await userServices.updateSignleUserDb(
      req.params.userId,
      req.body,
    );
    res.status(200).json({
      success: true,
      message: 'User update successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'User not updated!',
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

const deleteSingleUserControllerDB = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const result = await userServices.deleteSingleUserDB(req.params.userId);
    res.status(200).json({
      success: true,
      message: 'User successfully deleted!',
      data: null,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'User not deleted!',
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

export const userController = {
  createUserControllerDB,
  getAllUserControllerDB,
  getSingleUserDB,
  updatSingleUserControllerDB,
  deleteSingleUserControllerDB,
};
