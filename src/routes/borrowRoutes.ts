import * as borrowController from "@/controllers/borrowController";
import { validateRequest } from "@/middlewares/validateRequest";
import {
  borrowBookParamsSchema,
  returnBookParamsSchema,
  returnBookSchema,
} from "@/schemas/";
import { Router } from "express";

const router = Router({ mergeParams: true });

router.post(
  "/borrow/:bookId",
  validateRequest(borrowBookParamsSchema, "params"),
  borrowController.borrowBook,
);
router.post(
  "/return/:bookId",
  validateRequest(returnBookParamsSchema, "params"),
  validateRequest(returnBookSchema, "body"),
  borrowController.returnBook,
);

export default router;
