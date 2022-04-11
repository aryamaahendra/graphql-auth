import { ApolloContext, UserPayload } from "@metypes";
import { ExpressContext } from "apollo-server-express";
import { Container } from "typedi";
import { v4 as uuidV4 } from "uuid";
import jwt, { JwtPayload } from "jsonwebtoken";
import { __secret__ } from "@config";
import { cookieName } from "@config/cookies";

export const context = ({ req, res }: ExpressContext): ApolloContext => {
   const requestId = uuidV4();
   const container = Container.of(requestId);
   const token = req.cookies[cookieName];
   let user: UserPayload | null = null;
   if (token) {
      try {
         const payload = jwt.verify(token, __secret__) as JwtPayload;
         user = payload.user as UserPayload;
      } catch (err) {
         res.clearCookie(cookieName);
      }
   }
   return { req, res, container, requestId, user };
};
