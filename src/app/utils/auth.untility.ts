import { Service } from "typedi";
import { UserInputError } from "apollo-server-core";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { __secret__ } from "@config";
import { cookieExp } from "@config/cookies";

@Service({ global: true })
export default class AuthUtility {
   async hash(text: string) {
      try {
         const salt = await bcrypt.genSalt(10);
         const hash = await bcrypt.hash(text, salt);
         return hash;
      } catch (err) {
         throw new UserInputError("cannot create user");
      }
   }

   compare(password: string, hash: string): Promise<boolean> {
      return bcrypt.compare(password, hash);
   }

   generateToken(payload: JwtPayload): string {
      return jwt.sign(payload, __secret__, { expiresIn: cookieExp });
   }

   verifyToken(token: string) {
      return jwt.verify(token, __secret__);
   }
}
