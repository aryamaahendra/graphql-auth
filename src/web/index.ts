import { ds } from "@database/data.source";
import express from "express";
import apollo from "./apollo";
import http from "http";
import cookieParser from "cookie-parser";
import { PORT, PROD } from "@config";

const server = async () => {
   const app = express();
   const httpServer = http.createServer(app);

   if (!PROD) app.set("trust proxy", true);
   app.use(cookieParser());

   await ds.initialize();
   console.info("DB Connected.");

   await apollo(app, httpServer);
   console.info("Apollo server started.");

   await new Promise<void>((resolve) =>
      httpServer.listen({ port: PORT }, resolve)
   );
   console.info(`Server started port:${PORT}`);
};

export default server;
