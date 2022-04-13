import { PROD } from "@config";
import {
   ApolloServerPluginLandingPageLocalDefault,
   ApolloServerPluginLandingPageProductionDefault,
   PluginDefinition,
} from "apollo-server-core";

export const plugins = [
   PROD
      ? ApolloServerPluginLandingPageProductionDefault({ footer: false })
      : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
] as PluginDefinition[];
