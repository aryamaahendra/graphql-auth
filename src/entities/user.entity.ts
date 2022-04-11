import {
   Column,
   Entity,
   JoinColumn,
   ManyToOne,
   PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "./role.entity";
import { Timestamp } from "./timestamp";

@Entity({ name: "users" })
export class User extends Timestamp {
   @PrimaryGeneratedColumn("uuid")
   id!: string;

   @Column({ length: 64 })
   name!: string;

   @Column({ length: 128, unique: true })
   email!: string;

   @Column()
   password!: string;

   @ManyToOne(() => Role, (role) => role.users, {
      eager: true,
      nullable: false,
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
   })
   @JoinColumn({ name: "role_id" })
   role!: Role;

   @Column({ type: "uuid", name: "role_id" })
   roleId!: string;

   @Column({ default: true })
   status!: boolean;
}
