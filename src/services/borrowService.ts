import { AppDataSource } from "@/data-source";
import { Book, Borrow, User } from "@/entities";
import {
  BookAlreadyBorrowedError,
  BookNotFoundError,
  BorrowRecordNotFoundError,
  UserNotFoundError,
} from "@/errors";
import { IsNull } from "typeorm";

export const borrowBook = async (
  userId: number,
  bookId: number,
): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const borrowRepository = AppDataSource.getRepository(Borrow);
  const bookRepository = AppDataSource.getRepository(Book);

  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) {
    throw new UserNotFoundError(userId);
  }

  const book = await bookRepository.findOne({ where: { id: bookId } });
  if (!book) {
    throw new BookNotFoundError(bookId);
  }

  const existingBorrow = await borrowRepository.findOne({
    where: {
      book: { id: bookId },
      returnDate: IsNull(),
    },
  });

  if (existingBorrow) {
    throw new BookAlreadyBorrowedError(bookId);
  }

  const borrow = borrowRepository.create({
    user: { id: userId },
    book: { id: bookId },
    borrowDate: new Date(),
  });

  await borrowRepository.save(borrow);
};

export const returnBook = async (
  userId: number,
  bookId: number,
  score: number,
): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const borrowRepository = AppDataSource.getRepository(Borrow);
  const bookRepository = AppDataSource.getRepository(Book);

  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) {
    throw new UserNotFoundError(userId);
  }

  const book = await bookRepository.findOne({ where: { id: bookId } });
  if (!book) {
    throw new BookNotFoundError(bookId);
  }

  const borrow = await borrowRepository.findOne({
    where: {
      user: { id: userId },
      book: { id: bookId },
      returnDate: IsNull(),
    },
    relations: ["book"],
  });

  if (!borrow) {
    throw new BorrowRecordNotFoundError(userId, bookId);
  }

  borrow.returnDate = new Date();
  borrow.userScore = score;

  await borrowRepository.save(borrow);
};

export async function getAllBorrows() {
  const borrowRepository = AppDataSource.getRepository(Borrow);

  try {
    const borrows = await borrowRepository.find({
      relations: ["user", "book"],
    });

    return borrows;
  } catch (error) {
    console.error("Error fetching borrows:", error);
    throw error;
  }
}
