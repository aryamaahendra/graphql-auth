import AuthUtility from "@app/utils/auth.untility";
import { User } from "@entities/user.entity";
import { IUSerRepository } from "@interfaces/user.repository.interface";
import { UserPayload } from "@metypes";
import { UserRepository } from "@repositories/user.reposiotry";
import { AuthenticationError } from "apollo-server-core";
import { Inject, Service } from "typedi";

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
         } as UserPayload,
      });

      return {
         user,
         token,
      };
   }
}
