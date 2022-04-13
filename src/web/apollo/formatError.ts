import { ValidationError as YupValidationError } from "yup";
import { ValidationError as ApolloValidationError } from "apollo-server-core";
import { GraphQLError, GraphQLFormattedError } from "graphql";

export default (
   err: GraphQLError
): GraphQLFormattedError<Record<string, any>> => {
   if (err instanceof YupValidationError) {
      return new ApolloValidationError(err.errors[0]);
   }
   return err;
};
