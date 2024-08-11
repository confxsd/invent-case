import { AppDataSource } from "@/data-source";
import { Book, Borrow, User } from "@/entities";
import {
  BookAlreadyBorrowedError,
  BookNotFoundError,
  BorrowRecordNotFoundError,
  ReturnBookError,
  UpdateBookScoreError,
  UserNotFoundError,
} from "@/errors";
import { updateBookScore } from "@/services/bookService";
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
  const queryRunner = AppDataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const userRepository = queryRunner.manager.getRepository(User);
    const borrowRepository = queryRunner.manager.getRepository(Borrow);

    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new UserNotFoundError(userId);
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

    await updateBookScore(bookId, queryRunner);

    await queryRunner.commitTransaction();
  } catch (error) {
    await queryRunner.rollbackTransaction();
    if (
      error instanceof BorrowRecordNotFoundError ||
      error instanceof UserNotFoundError ||
      error instanceof UpdateBookScoreError ||
      error instanceof BookNotFoundError
    ) {
      throw error;
    }

    console.error("Error returning book:", error);
    throw new ReturnBookError(userId, bookId);
  } finally {
    await queryRunner.release();
  }
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
