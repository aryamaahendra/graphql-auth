import { __prod__ } from "@config";
import { ApolloContext } from "@metypes";
import {
   ApolloServerPluginLandingPageLocalDefault,
   ApolloServerPluginLandingPageProductionDefault,
   GraphQLRequestContext,
   PluginDefinition,
} from "apollo-server-core";
import Container from "typedi";

export const plugins = [
   {
      requestDidStart: () => ({
         willSendResponse: (
            requestContext: GraphQLRequestContext<ApolloContext>
         ) => {
            Container.reset(requestContext.context.requestId);
         },
      }),
   },
   __prod__
      ? ApolloServerPluginLandingPageProductionDefault({ footer: false })
      : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
] as PluginDefinition[];
