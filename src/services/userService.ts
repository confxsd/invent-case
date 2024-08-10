import { User } from "@/entities/User";
import { UserNotFoundError } from "@/errors";
import * as userRepository from "@/repositories/userRepository";
import { UserDetailResponse, UserListResponse } from "@/responses";

export const getAllUsers = async (): Promise<UserListResponse[]> => {
  const users = await userRepository.getAllUsers();

  return users.map((user) => ({
    id: user.id,
    name: user.name,
  }));
};

export const createUser = async (name: string): Promise<User> => {
  return await userRepository.createUser(name);
};

export const getUserById = async (
  userId: number,
): Promise<UserDetailResponse> => {
  const user = await userRepository.getUserById(userId);
  if (!user) {
    throw new UserNotFoundError(userId);
  }

  const userWithBooks = await userRepository
    .getUserWithBooksQuery(userId)
    .getRawMany();

  if (userWithBooks.length === 0) {
    return {
      id: user.id,
      name: user.name,
      books: {
        past: [],
        present: [],
      },
    };
  }

  const userResult = {
    id: userWithBooks[0].user_id,
    name: userWithBooks[0].user_name,
    books: {
      past: userWithBooks
        .filter(
          (borrow) =>
            borrow.borrow_returnDate !== null && borrow.book_name !== null,
        )
        .map((borrow) => ({
          name: borrow.book_name,
          userScore: borrow.borrow_userScore,
        })),
      present: userWithBooks
        .filter(
          (borrow) =>
            borrow.borrow_returnDate === null && borrow.book_name !== null,
        )
        .map((borrow) => ({
          name: borrow.book_name,
        })),
    },
  };

  return userResult;
};
