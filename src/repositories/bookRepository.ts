import { AppDataSource } from "@/data-source";
import { Book } from "@/entities/Book";
import { Borrow } from "@/entities/Borrow";
import { QueryRunner } from "typeorm";

export const updateBookScore = async (
  bookId: number,
  queryRunner: QueryRunner,
): Promise<void> => {
  const borrowRepository = queryRunner.manager.getRepository(Borrow);
  const bookRepository = queryRunner.manager.getRepository(Book);

  const averageScore = await borrowRepository
    .createQueryBuilder("borrow")
    .select("COALESCE(AVG(borrow.userScore), 0)", "averageScore")
    .where("borrow.bookId = :bookId", { bookId })
    .getRawOne();

  await bookRepository.update(bookId, {
    averageScore: parseFloat(averageScore.averageScore),
  });
};

export const getAllBooks = async (): Promise<Book[]> => {
  const bookRepository = AppDataSource.getRepository(Book);
  return await bookRepository.find();
};

export const getBookById = async (id: number): Promise<Book | null> => {
  const bookRepository = AppDataSource.getRepository(Book);

  const book = await bookRepository.findOne({
    where: { id },
    select: ["id", "name", "averageScore"],
  });

  return book;
};
export const createBook = async (name: string): Promise<Book> => {
  const bookRepository = AppDataSource.getRepository(Book);
  const book = bookRepository.create({ name });

  return await bookRepository.save(book);
};
