import { UserResolver } from "@graphql/resolvers/user.resolver";
import { AuthResolver } from "./resolvers/auth.resolver";

export default [UserResolver, AuthResolver] as const;
