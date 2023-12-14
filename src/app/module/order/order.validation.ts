import Joi from 'joi';

export const CreateOrderValidtaionSchema = Joi.object({
  productName: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
});
