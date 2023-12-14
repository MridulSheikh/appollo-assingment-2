import express from 'express';
import { userController } from './user.controller';
import { orderController } from '../order/order.controller';
const router = express.Router();

router
  .route('/')
  .post(userController.createUserControllerDB)
  .get(userController.getAllUserControllerDB);
router
  .route('/:userId/orders/total-price')
  .get(orderController.getTotalPriceForSpacipicUser);
router
  .route('/:userId/orders')
  .put(orderController.createOrder)
  .get(orderController.getOrderForSpacificUser);
router
  .route('/:userId')
  .get(userController.getSingleUserDB)
  .put(userController.updatSingleUserControllerDB)
  .delete(userController.deleteSingleUserControllerDB);

export const userRoutes = router;
