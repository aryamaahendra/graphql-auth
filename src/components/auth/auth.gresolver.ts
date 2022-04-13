import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { JWT_COOKIE_OPS, COOKIE_NAME } from "@config/cookies";
import { AuthService } from "./auth.service";
import { AuthPayload } from "./auth.gtype";
import { Service } from "typedi";
import { ApolloContext } from "@web/apollo";

@Service()
@Resolver()
export class AuthResolver {
   constructor(private _service: AuthService) {}

   @Mutation((returns) => AuthPayload, { name: "login" })
   async login(
      @Arg("email") email: string,
      @Arg("password") password: string,
      @Ctx() ctx: ApolloContext
   ): Promise<AuthPayload> {
      const auth = await this._service.login(email, password);
      ctx.res.cookie(COOKIE_NAME, auth.token, JWT_COOKIE_OPS);
      return {
         user: {
            ...auth.user,
            role: auth.user.role.name,
         },
         token: auth.token,
      };
   }
}
