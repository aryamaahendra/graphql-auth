import { Field, ObjectType } from "type-graphql";
import { UserType } from "../users";

@ObjectType()
export class AuthPayload {
   @Field((type) => UserType)
   user!: UserType;

   @Field()
   token!: string;
}
