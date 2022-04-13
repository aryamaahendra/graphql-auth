import { CreateUserService } from "./user.service";
import { User } from "./user.gtype";
import { Service } from "typedi";
import {
   Arg,
   Authorized,
   Field,
   InputType,
   Mutation,
   Resolver,
} from "type-graphql";

@InputType()
class CreateUserInput implements Partial<User> {
   @Field()
   name!: string;
   @Field()
   email!: string;
   @Field()
   password!: string;
}

@Service()
@Resolver()
export class CreateUserResolver {
   constructor(private service: CreateUserService) {}

   @Mutation((returns) => User, { name: "createUser" })
   @Authorized(["admin"])
   async create(@Arg("data") inputs: CreateUserInput): Promise<User> {
      const user = await this.service.create({
         name: inputs.name,
         email: inputs.email,
         password: inputs.password,
      });
      return {
         ...user,
         role: user.role.name,
      };
   }
}
