import { INode, ITableTimestemp } from "@interfaces/base.graphql.interface";
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
