import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class Timestamp {
   @CreateDateColumn({ name: "created_at" })
   createdAt!: Date;

   @UpdateDateColumn({ name: "updated_at" })
   updatedAt!: Date;
}
