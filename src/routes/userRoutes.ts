import { Router } from "express";
import * as borrowController from "@/controllers/borrowController";
import * as userController from "@/controllers/userController";
import { validateRequest } from "@/middlewares/validateRequest";
import {
  borrowBookParamsSchema,
  createUserSchema,
  getUserByIdSchema,
  returnBookSchema,
} from "@/schemas/";

const router = Router();

router.get("/borrows", borrowController.getBorrowedBooks);
router.get("/", userController.getUsers);
router.get(
  "/:id",
  validateRequest(getUserByIdSchema, "params"),
  userController.getUserById,
);
router.post(
  "/",
  validateRequest(createUserSchema, "body"),
  userController.createUser,
);
router.post(
  "/:userId/borrow/:bookId",
  validateRequest(borrowBookParamsSchema, "params"),
  borrowController.borrowBook,
);
router.post(
  "/:userId/return/:bookId",
  validateRequest(returnBookSchema, "body"),
  borrowController.returnBook,
);

export default router;
