import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const validateRequest = (
  schema: Joi.ObjectSchema,
  source: "body" | "params",
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[source]);
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((detail) => detail.message) });
    }
    next();
  };
};
