import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { User } from "./user.gtype";
import { Inject, Service } from "typedi";
import { ApolloContext } from "@web/apollo";
import { IUSerRepository } from "./user.interface";
import { UserRepository } from "./user.repository";

@Service()
@Resolver()
export class UserResolver {
   constructor(
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

   @Query((returns) => User)
   @Authorized()
   async me(@Ctx() ctx: ApolloContext): Promise<User> {
      const user = await this.repository.findById(ctx.user!.id);
      if (!user) throw new Error("something broke.");
      return {
         ...user,
         role: user.role.name,
      };
   }
}
