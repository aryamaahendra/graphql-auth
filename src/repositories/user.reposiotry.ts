import { User } from "@entities/user.entity";
import { IUSerRepository } from "@interfaces/user.repository.interface";
import { CraeteUserType } from "@metypes";
import { ds } from "@app/utils/data.source";
import { Service } from "typedi";
import { UserInputError, ValidationError } from "apollo-server-core";

@Service()
export class UserRepository implements IUSerRepository {
   private _db = ds.getRepository(User);

   findById(id: string): Promise<User | null> {
      return this._db.findOne({
         where: { id },
      });
   }

   findByEmail(email: string): Promise<User | null> {
      return this._db.findOne({ where: { email } });
   }

   async create(data: CraeteUserType): Promise<User> {
      const exist = await this._db.count({ where: { email: data.email } });
      if (exist >= 1) throw new ValidationError("email already exist.");

      const result = await this._db.insert({
         ...data,
         roleId: "b7a35bd2-49ef-4ee6-b9b4-33529108bd4d",
         status: true,
      });
      if (!result.identifiers[0].id)
         throw new UserInputError("cannot create user.");

      const user = await this._db.findOne({
         where: result.identifiers[0],
      });
      if (!user) throw new UserInputError("cannot create user.");

      return user;
   }
}
