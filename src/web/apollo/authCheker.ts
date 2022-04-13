import { ApolloContext } from "./contex";
import { AuthChecker } from "type-graphql";

export const authChecker: AuthChecker<ApolloContext> = (
   { root, args, context, info },
   roles
) => {
   if (!context.user) return false;
   if (roles.length <= 0) return true;
   if (roles.includes(context.user.role)) return true;
   return false;
};
