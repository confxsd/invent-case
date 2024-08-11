import { AppDataSource } from "@/data-source";
import bookRoutes from "@/routes/bookRoutes";
import userRoutes from "@/routes/userRoutes";
import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import "reflect-metadata";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    // DEBUG
    // const queryRunner = AppDataSource.createQueryRunner();
    // console.log("Dropping all tables...");
    // queryRunner.clearDatabase();
    // console.log("All tables have been dropped!");
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });

app.use("/users", userRoutes);
app.use("/books", bookRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "An internal error occurred", error: err.message });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
