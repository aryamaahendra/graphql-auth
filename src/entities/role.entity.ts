import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Timestamp } from "./timestamp";
import { User } from "./user.entity";

@Entity({ name: "roles" })
export class Role extends Timestamp {
   @PrimaryGeneratedColumn("uuid")
   id!: string;

   @Column({ unique: true, length: 16 })
   name!: string;

   @OneToMany(() => User, (user) => user.role)
   users?: User[];
}
