import { Router } from "express";
import * as bookController from "@/controllers/bookController";
import { validateRequest } from "@/middlewares/validateRequest";
import { createBookSchema } from "@/schemas";

const router = Router();

router.get("/", bookController.getBooks);
router.get("/:id", bookController.getBookById);
router.post(
  "/",
  validateRequest(createBookSchema, "body"),
  bookController.createBook,
);

export default router;
