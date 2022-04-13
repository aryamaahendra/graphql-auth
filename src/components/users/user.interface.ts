import { User } from "@entities/user.entity";

export interface IUSerRepository {
   findById(id: string): Promise<User | null>;
   create(data: ICreateUserInput): Promise<User>;
   findByEmail(email: string): Promise<User | null>;
}

export interface ICreateUserInput {
   name: string;
   email: string;
   password: string;
}

export interface IUpdateUserInput {
   name: string;
   email: string;
}
