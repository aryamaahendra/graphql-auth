import orphanedTypes from "../graphql/orphaned.types";
import resolvers from "../graphql/register.gresolver";
import { buildSchema } from "type-graphql";
import { authChecker } from "./authCheker";
import Container from "typedi";

export const getSchema = () => {
   return buildSchema({
      resolvers,
      orphanedTypes,
      dateScalarMode: "timestamp",
      container: Container,
      authChecker,
   });
};
