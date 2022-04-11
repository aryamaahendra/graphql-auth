import "reflect-metadata";
import "dotenv/config";
import server from "./app";

server().catch((err) => {
   console.error(err);
});
