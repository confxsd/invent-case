import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Borrow } from "./Borrow";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @OneToMany(() => Borrow, (borrow) => borrow.user)
  borrows: Borrow[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
}
