import Joi from 'joi';

export const userNameValidationSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
});

export const addressValidationSchema = Joi.object({
  street: Joi.string(),
  city: Joi.string(),
  country: Joi.string(),
});

export const orderValidtaionSchema = Joi.object({
  productName: Joi.string(),
  price: Joi.number(),
  quantity: Joi.number(),
});

export const userVlidationSchema = Joi.object({
  userId: Joi.number(),
  username: Joi.string(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  fullName: userNameValidationSchema,
  age: Joi.number(),
  email: Joi.string().email(),
  isActive: Joi.boolean().default(true).optional(),
  hobbies: Joi.array().items(Joi.string()),
  address: addressValidationSchema,
  orders: Joi.array().items(orderValidtaionSchema).optional(),
});
