import { AppDataSource } from "@/data-source";
import { Book } from "@/entities/Book";

export const getAllBooks = async (): Promise<Book[]> => {
  const bookRepository = AppDataSource.getRepository(Book);
  return await bookRepository.find();
};

export const getBookById = async (id: number): Promise<any> => {
  const bookRepository = AppDataSource.getRepository(Book);

  const book = await bookRepository
    .createQueryBuilder("book")
    .leftJoin("book.borrows", "borrow")
    .select([
      "book.id AS book_id",
      "book.name AS book_name",
      "COALESCE(AVG(borrow.userScore), 0) AS average_score",
    ])
    .where("book.id = :id", { id })
    .groupBy("book.id")
    .addGroupBy("book.name")
    .getRawOne();

  return book;
};

export const createBook = async (name: string): Promise<Book> => {
  const bookRepository = AppDataSource.getRepository(Book);
  const book = bookRepository.create({ name });

  return await bookRepository.save(book);
};
