import "reflect-metadata";
import "dotenv/config";
import server from "./web";

server().catch((err) => {
   console.error(err);
});
