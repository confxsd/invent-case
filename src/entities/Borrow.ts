import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";
import { User } from "./User";

@Entity()
export class Borrow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date" })
  borrowDate: Date;

  @Column({ type: "date", nullable: true })
  returnDate: Date | null;

  @Column({ type: "int", nullable: true })
  userScore: number | null;

  @ManyToOne(() => User, (user) => user.borrows)
  user: User;

  @ManyToOne(() => Book, (book) => book.borrows)
  book: Book;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
}
