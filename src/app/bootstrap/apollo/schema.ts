import orphanedTypes from "@graphql/orphaned.types";
import resolvers from "@graphql/resolver.register";
import { buildSchema, ResolverData } from "type-graphql";
import { ApolloContext } from "@metypes";
import { authChecker } from "./authCheker";
import { __prod__ } from "@config";

export const getSchema = () => {
   return buildSchema({
      resolvers,
      orphanedTypes,
      dateScalarMode: "timestamp",
      container: ({ context }: ResolverData<ApolloContext>) =>
         context.container,
      authChecker,
   });
};
