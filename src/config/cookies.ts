import { CookieOptions } from "express";
import { PROD } from "./constant";

export const COOKIE_NAME = "simpegtoken";
export const COOKIE_EXP = Number(process.env.CCOOKIE_EXP) || 60 * 10;
export const JWT_SECRET = process.env.JWT_SECRET || "akurahasia";
export const JWT_COOKIE_OPS: CookieOptions = {
   httpOnly: true,
   secure: true,
   sameSite: PROD ? "lax" : "none",
   maxAge: 1000 * COOKIE_EXP,
};
