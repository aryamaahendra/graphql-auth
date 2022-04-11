import { resolve, join } from "path";

export const __prod__ = process.env.NODE_ENV === "production";
export const __port__ = Number(process.env.PORT) || 3000;
export const __root__ = join(resolve(__dirname), "../..");
export const __secret__ = process.env.JWT_SECRET || "akurahasia";
