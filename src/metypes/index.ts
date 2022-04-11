import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { ContainerInstance } from "typedi";

export * from "./user.types";

export interface UserPayload {
   id: string;
   name: string;
   role: string;
   status: boolean;
}
export type JWTPayload = JwtPayload | string | null;
export type Token = string | undefined | null;
export type ApolloContext = {
   res: Response;
   req: Request;
   container: ContainerInstance;
   requestId: string;
   user: UserPayload | null;
};
