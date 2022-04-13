import { JwtUserPayload } from "@components/auth";
import { ExpressContext } from "apollo-server-express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@config";
import { COOKIE_NAME } from "@config/cookies";
import { Request, Response } from "express";

export interface ApolloContext {
   res: Response;
   req: Request;
   user: JwtUserPayload | null;
}

export const context = ({ req, res }: ExpressContext): ApolloContext => {
   const token = req.cookies[COOKIE_NAME];
   let user: JwtUserPayload | null = null;
   if (token) {
      try {
         const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
         user = payload.user as JwtUserPayload;
      } catch (err) {
         res.clearCookie(COOKIE_NAME);
      }
   }
   return { req, res, user };
};
