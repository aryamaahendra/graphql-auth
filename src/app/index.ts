import express from "express";
import http from "http";
import { __port__, __root__ } from "../config";
import bootstrap from "./bootstrap";

const server = async () => {
   const app = express();
   const httpServer = http.createServer(app);

   await bootstrap({ app, httpServer });

   await new Promise<void>((resolve) =>
      httpServer.listen({ port: __port__ }, resolve)
   );
   console.info(`Server started port:${__port__}`);
};

export default server;
