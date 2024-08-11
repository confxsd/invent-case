import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Borrow } from "./Borrow";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  name: string;

  @Index()
  @Column({ type: "decimal", precision: 5, scale: 2, default: -1 })
  averageScore: number;

  @OneToMany(() => Borrow, (borrow) => borrow.book)
  borrows: Borrow[];
}
