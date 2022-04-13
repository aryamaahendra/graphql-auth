import { PROD } from "@config";
import { ApolloServer } from "apollo-server-express";
import { Express } from "express";
import formatError from "./formatError";
import { getSchema } from "./schema";
import { plugins } from "./plugins";
import { context } from "./contex";
import http from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";

const startApolloServer = async (app: Express, httpServer: http.Server) => {
   const schema = await getSchema();
   const server = new ApolloServer({
      schema,
      context,
      plugins: [...plugins, ApolloServerPluginDrainHttpServer({ httpServer })],
      formatError,
      introspection: !PROD,
   });

   await server.start();
   server.applyMiddleware({
      app,
      cors: {
         origin: ["https://studio.apollographql.com"],
         credentials: true,
      },
   });
};

export { ApolloContext } from "./contex";
export default startApolloServer;
