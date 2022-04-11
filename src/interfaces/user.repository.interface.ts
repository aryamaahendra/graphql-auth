import { User } from "@entities/user.entity";
import { CraeteUserType } from "@metypes";

export interface IUSerRepository {
   findById(id: string): Promise<User | null>;
   create(data: CraeteUserType): Promise<User>;
   findByEmail(email: string): Promise<User | null>;
}
