import { Book } from "@/entities";
import { BookNotFoundError, UpdateBookScoreError } from "@/errors";
import * as bookRepository from "@/repositories/bookRepository";
import { BookDetailResponse, BookListResponse } from "@/responses";
import { QueryRunner } from "typeorm";

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

  // TODO: ask this
  const score =
    book.averageScore.toString() === "-1.00" ? -1 : book.averageScore;

  return {
    id: book.id,
    name: book.name,
    score,
  };
};

export const createBook = async (name: string): Promise<Book> => {
  return await bookRepository.createBook(name);
};

export const updateBookScore = async (
  bookId: number,
  queryRunner: QueryRunner,
): Promise<void> => {
  try {
    await bookRepository.updateBookScore(bookId, queryRunner);
  } catch (error) {
    throw new UpdateBookScoreError(bookId);
  }
};
