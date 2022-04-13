import { resolve, join } from "path";

export const PROD = process.env.NODE_ENV === "production";
export const PORT = Number(process.env.PORT) || 3000;
export const ROOT = join(resolve(__dirname), "../..");
