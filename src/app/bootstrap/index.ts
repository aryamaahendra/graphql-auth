import { ds } from "@app/utils/data.source";
import { Express } from "express";
import apollo from "./apollo";
import { initContaner } from "./IoC/container";
import http from "http";
import cookieParser from "cookie-parser";
import { __prod__ } from "@config";

const bootstrap = async ({
   app,
   httpServer,
}: {
   app: Express;
   httpServer: http.Server;
}) => {
   if (!__prod__) app.set("trust proxy", true);
   app.use(cookieParser());

   await ds.initialize();
   console.info("DB Connected.");

   await initContaner();

   await apollo(app, httpServer);
   console.info("Apollo server started.");
};

export default bootstrap;
