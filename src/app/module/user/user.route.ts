import express from 'express';
import { userController } from './user.controller';
const router = express.Router();

router
  .route('/')
  .post(userController.createUserControllerDB)
  .get(userController.getAllUserControllerDB);
router
  .route('/:userId')
  .get(userController.getSingleUserDB)
  .put(userController.updatSingleUserControllerDB)
  .delete(userController.deleteSingleUserControllerDB);

export const userRoutes = router;
