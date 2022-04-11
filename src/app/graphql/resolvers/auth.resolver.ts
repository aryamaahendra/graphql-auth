import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { IUSerRepository } from "@interfaces/user.repository.interface";
import { UserRepository } from "@repositories/user.reposiotry";
import { cookieConfig, cookieName } from "@config/cookies";
import { AuthService } from "@services/auth.service";
import { AuthPayload } from "../types/auth.type";
import { Inject, Service } from "typedi";
import { ApolloContext } from "@metypes";
import { User } from "../types/user.type";

@Service()
@Resolver()
export class AuthResolver {
   constructor(
      private _service: AuthService,
      @Inject(() => UserRepository) private repository: IUSerRepository
   ) {}

   @Mutation((returns) => AuthPayload, { name: "login" })
   async login(
      @Arg("email") email: string,
      @Arg("password") password: string,
      @Ctx() ctx: ApolloContext
   ): Promise<AuthPayload> {
      const auth = await this._service.login(email, password);
      ctx.res.cookie(cookieName, auth.token, cookieConfig);
      return {
         user: {
            ...auth.user,
            role: auth.user.role.name,
         },
         token: auth.token,
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
