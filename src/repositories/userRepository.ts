import { AppDataSource } from "@/data-source";
import { User } from "@/entities/User";
import { SelectQueryBuilder } from "typeorm";

export const getAllUsers = async (): Promise<User[]> => {
  const userRepository = AppDataSource.getRepository(User);
  return await userRepository.find();
};

export const getUserById = async (id: number): Promise<User | null> => {
  const userRepository = AppDataSource.getRepository(User);

  return await userRepository.findOne({
    where: { id },
    relations: ["borrows", "borrows.book"],
  });
};

export const createUser = async (name: string): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = userRepository.create({ name });

  return await userRepository.save(user);
};

export const getUserWithBooksQuery = (
  userId: number,
): SelectQueryBuilder<User> => {
  const userRepository = AppDataSource.getRepository(User);

  return userRepository
    .createQueryBuilder("user")
    .leftJoin("user.borrows", "borrow")
    .leftJoin("borrow.book", "book")
    .addSelect([
      "user.id AS user_id",
      "user.name AS user_name",
      "borrow.id AS borrow_id",
      "book.id AS book_id",
      "book.name AS book_name",
      "borrow.returnDate",
      "borrow.userScore",
    ])
    .where("user.id = :userId", { userId });
};
