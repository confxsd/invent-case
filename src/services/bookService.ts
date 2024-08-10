import { AppDataSource } from "@/data-source";
import { Book } from "@/entities";
import { BookNotFoundError } from "@/errors";
import * as bookRepository from "@/repositories/bookRepository";
import { BookDetailResponse, BookListResponse } from "@/responses";

export const getAllBooks = async (): Promise<BookListResponse[]> => {
  const books = await bookRepository.getAllBooks();

  return books.map((book) => ({
    id: book.id,
    name: book.name,
  }));
};

export const getBookById = async (id: number): Promise<BookDetailResponse> => {
  const book = await bookRepository.getBookById(id);

  if (!book) {
    throw new BookNotFoundError(id);
  }

  const score =
    parseFloat(book.average_score) === 0
      ? -1
      : parseFloat(book.average_score).toFixed(2);

  return {
    id: book.book_id,
    name: book.book_name,
    score,
  };
};

export const createBook = async (name: string): Promise<Book> => {
  return await bookRepository.createBook(name);
};
