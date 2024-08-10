import { UserNotFoundError } from "@/errors";
import * as userService from "@/services/userService";
import { NextFunction, Request, Response } from "express";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error: any) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await userService.getUserById(Number(req.params.id));

    res.json(user);
  } catch (error: any) {
    if (error instanceof UserNotFoundError) {
      return res.status(404).json({ message: error.message });
    }
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name } = req.body;
    const user = await userService.createUser(name);
    res.status(201).json(user);
  } catch (error: any) {
    next(error);
  }
};
