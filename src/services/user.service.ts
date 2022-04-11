import { IUSerRepository } from "@interfaces/user.repository.interface";
import { UserRepository } from "@repositories/user.reposiotry";
import { CraeteUserType } from "@metypes";
import { Inject, Service } from "typedi";
import { User } from "@entities/user.entity";
import AuthUtility from "@app/utils/auth.untility";
import UserValidator from "@validators/user.validator";
import { IValidator } from "@interfaces/validator.interface";

@Service()
export class UserService {
   constructor(
      @Inject(() => UserRepository)
      private repository: IUSerRepository,
      @Inject(() => UserValidator)
      private validator: IValidator,
      private authUtility: AuthUtility
   ) {}

   public async create(data: CraeteUserType): Promise<User> {
      const validated = await this.validator.validate<CraeteUserType>(
         data,
         "CREATE"
      );
      const user = await this.repository.create({
         ...validated,
         password: await this.authUtility.hash(data.password),
      });
      return user;
   }
}
