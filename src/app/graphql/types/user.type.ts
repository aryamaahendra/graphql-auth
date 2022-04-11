import { INode, ITableTimestemp } from "@graphql/interfaces/general.interface";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType({ implements: [ITableTimestemp, INode] })
export class User extends ITableTimestemp {
   @Field((type) => ID)
   name!: string;

   @Field()
   email!: string;

   @Field()
   role!: string;

   @Field()
   status!: boolean;
}
