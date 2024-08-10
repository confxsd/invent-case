import { BookNotFoundError } from "@/errors";
import * as bookService from "@/services/bookService";
import { NextFunction, Request, Response } from "express";

export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const books = await bookService.getAllBooks();
    res.json(books);
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const book = await bookService.getBookById(Number(req.params.id));
    res.json(book);
  } catch (error) {
    if (error instanceof BookNotFoundError) {
      return res.status(404).json({ message: error.message });
    }
    next(error);
  }
};

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const book = await bookService.createBook(req.body.name);
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};
