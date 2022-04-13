import { Inject, Service } from "typedi";
import { IValidator } from "@interfaces/validator.interface";
import { AuthUtility } from "@components/auth";
import { IUSerRepository, ICreateUserInput } from "./user.interface";
import { UserRepository } from "./user.repository";
import { User } from "@entities/user.entity";
import { UserValidator } from "./user.validator";

@Service()
export class CreateUserService {
   constructor(
      @Inject(() => UserRepository)
      private repository: IUSerRepository,
      @Inject(() => UserValidator)
      private validator: IValidator,
      private authUtility: AuthUtility
   ) {}

   public async create(data: ICreateUserInput): Promise<User> {
      const validated = await this.validator.validate<ICreateUserInput>(
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
