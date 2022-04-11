import { CookieOptions } from "express";
import { __prod__ } from "./constant";

export const cookieName = "simpegtoken";
export const cookieExp = Number(process.env.CCOOKIE_EXP) || 60 * 10;
export const cookieConfig: CookieOptions = {
   httpOnly: true,
   secure: true,
   sameSite: __prod__ ? "lax" : "none",
   maxAge: 1000 * cookieExp,
};
