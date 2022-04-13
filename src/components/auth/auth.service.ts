import { AuthUtility } from "./auth.utility";
import { User } from "@entities/user.entity";
import { JwtUserPayload } from "./auth.utility";
import { AuthenticationError } from "apollo-server-core";
import { Inject, Service } from "typedi";
import { IUSerRepository, UserRepository } from "../users";

@Service()
export class AuthService {
   constructor(
      @Inject(() => UserRepository)
      private repository: IUSerRepository,
      private authUtility: AuthUtility
   ) {}

   public async login(
      email: string,
      password: string
   ): Promise<{ user: User; token: string }> {
      if (
         email === "" ||
         password === "" ||
         password.length < 8 ||
         password.length > 32
      )
         throw new AuthenticationError("login failed.");

      const user = await this.repository.findByEmail(email);
      if (!user) throw new AuthenticationError("login failed.");

      const valid = await this.authUtility.compare(password, user.password);
      if (!valid) throw new AuthenticationError("login failed.");

      const token = this.authUtility.generateToken({
         user: {
            id: user.id,
            name: user.name,
            role: user.role.name,
            status: user.status,
         } as JwtUserPayload,
      });

      return {
         user,
         token,
      };
   }
}
