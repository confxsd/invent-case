import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { User } from "./entities/User";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

app.post("/users", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const newUser = userRepository.create(req.body);
    const savedUser = await userRepository.save(newUser);
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "An internal error occurred", error: err.message });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
