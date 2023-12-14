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

export const orderController = {
  createOrder,
};
