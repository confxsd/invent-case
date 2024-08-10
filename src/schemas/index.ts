import Joi from "joi";

export const getUserByIdSchema = Joi.object({
  id: Joi.number().integer().required(),
});

export const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
});

export const createBookSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
});

export const borrowBookParamsSchema = Joi.object({
  userId: Joi.number().integer().required(),
  bookId: Joi.number().integer().required(),
});

export const returnBookSchema = Joi.object({
  score: Joi.number().integer().min(1).max(10).required(),
});
