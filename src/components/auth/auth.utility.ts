import { Service } from "typedi";
import { UserInputError } from "apollo-server-core";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@config";
import { COOKIE_EXP } from "@config/cookies";

export interface JwtUserPayload {
   id: string;
   name: string;
   role: string;
   status: boolean;
}

@Service()
export class AuthUtility {
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
      return jwt.sign(payload, JWT_SECRET, { expiresIn: COOKIE_EXP });
   }

   verifyToken(token: string) {
      return jwt.verify(token, JWT_SECRET);
   }
}
