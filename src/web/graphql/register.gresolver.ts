import { UserResolver, CreateUserResolver } from "@components/users";
import { AuthResolver } from "@components/auth";

export default [UserResolver, CreateUserResolver, AuthResolver] as const;
