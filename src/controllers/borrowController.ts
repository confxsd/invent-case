import {
  BookAlreadyBorrowedError,
  BookNotFoundError,
  BorrowRecordNotFoundError,
  UpdateBookScoreError,
  UserNotFoundError,
} from "@/errors";
import * as borrowService from "@/services/borrowService";
import { NextFunction, Request, Response } from "express";

export const borrowBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await borrowService.borrowBook(
      Number(req.params.userId),
      Number(req.params.bookId),
    );
    res.status(204).send();
  } catch (error: any) {
    if (error instanceof UserNotFoundError) {
      return res.status(404).json({ message: error.message });
    }
    if (error instanceof BookNotFoundError) {
      return res.status(404).json({ message: error.message });
    }
    if (error instanceof BookAlreadyBorrowedError) {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
};

export const getBorrowedBooks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const borrowedBooks = await borrowService.getAllBorrows();
    res.json(borrowedBooks);
  } catch (error) {
    next(error);
  }
};

export const returnBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await borrowService.returnBook(
      Number(req.params.userId),
      Number(req.params.bookId),
      req.body.score,
    );
    res.status(204).send();
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return res.status(404).json({ message: error.message });
    }
    if (error instanceof BookNotFoundError) {
      return res.status(404).json({ message: error.message });
    }
    if (error instanceof BorrowRecordNotFoundError) {
      return res.status(404).json({ message: error.message });
    }
    if (error instanceof UpdateBookScoreError) {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
};
