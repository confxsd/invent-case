export class UserNotFoundError extends Error {
  constructor(userId: number) {
    super(`User with ID ${userId} not found`);
    this.name = "UserNotFoundError";
  }
}

export class BookNotFoundError extends Error {
  constructor(bookId: number) {
    super(`Book with ID ${bookId} not found`);
    this.name = "BookNotFoundError";
  }
}

export class BookAlreadyBorrowedError extends Error {
  constructor(bookId: number) {
    super(`Book with ID ${bookId} is currently borrowed by another user`);
    this.name = "BookAlreadyBorrowedError";
  }
}

export class BorrowRecordNotFoundError extends Error {
  constructor(userId: number, bookId: number) {
    super(
      `Borrow record not found for user ID ${userId} and book ID ${bookId}`,
    );
    this.name = "BorrowRecordNotFoundError";
  }
}
