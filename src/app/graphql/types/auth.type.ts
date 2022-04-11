import { Field, ObjectType } from "type-graphql";
import { User } from "./user.type";

@ObjectType()
export class AuthPayload {
   @Field((type) => User)
   user!: User;

   @Field()
   token!: string;
}
