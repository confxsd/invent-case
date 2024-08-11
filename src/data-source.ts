import "reflect-metadata";
import { DataSource } from "typeorm";
import { Book, Borrow, User } from "@/entities";
import { config } from "@/config";

export const AppDataSource = new DataSource({
  type: config.db.type as any,
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  entities: [User, Borrow, Book],
  synchronize: config.db.synchronize,
  logging: config.db.logging,
});
