import * as userController from "@/controllers/userController";
import { validateRequest } from "@/middlewares/validateRequest";
import { createUserSchema, getUserByIdSchema } from "@/validations/";
import { Router } from "express";
import borrowRoutes from "./borrowRoutes";

const router = Router();

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

router.use("/:userId", borrowRoutes);

export default router;
