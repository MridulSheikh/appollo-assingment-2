/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { orderServices } from './order.service';
import { CreateOrderValidtaionSchema } from './order.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = await CreateOrderValidtaionSchema.validateAsync(req.body);
    if (!order.productName) {
      throw new Error('Order Validation Failed');
    }
    await orderServices.createOrder(req.params.userId, order);
    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'order not created!',
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

const getOrderForSpacificUser = async (req: Request, res: Response) => {
  try {
    const orders = await orderServices.getOrderForSpacificUser(
      req.params.userId,
    );
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: orders,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'order not found!',
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

const getTotalPriceForSpacipicUser = async (req: Request, res: Response) => {
  try {
    const result = await orderServices.getTotalPriceForSpacipicUser(
      req.params.userId,
    );
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice: result,
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

export const orderController = {
  createOrder,
  getOrderForSpacificUser,
  getTotalPriceForSpacipicUser,
};
