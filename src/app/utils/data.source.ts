import { DataSource } from "typeorm";
import { join } from "path";
import { __prod__, __root__ } from "@config";

export const ds = new DataSource({
   type: "postgres",
   host: process.env.DB_HOST,
   port: 5432,
   username: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME,
   entities: [join(__root__, "src/entities/*.entity.[tj]s")],
   synchronize: !__prod__,
});
