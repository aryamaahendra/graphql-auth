import {
   Arg,
   Authorized,
   Ctx,
   Field,
   InputType,
   Mutation,
   Query,
   Resolver,
   ObjectType,
} from "type-graphql";
import { User } from "@graphql/types/user.type";
import { Inject, Service } from "typedi";
import { UserService } from "@services/user.service";
import { ApolloContext } from "@metypes";
import { IUSerRepository } from "@interfaces/user.repository.interface";
import { UserRepository } from "@repositories/user.reposiotry";

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
export class UserResolver {
   constructor(
      private service: UserService,
      @Inject(() => UserRepository) private repository: IUSerRepository
   ) {}

   @Query((returns) => User)
   @Authorized()
   async user(@Ctx() ctx: ApolloContext): Promise<User> {
      const user = await this.repository.findById(ctx.user!.id);
      if (!user) throw new Error("something broke.");
      return {
         ...user,
         role: user.role.name,
      };
   }

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
