import { Field, InterfaceType } from "type-graphql";

@InterfaceType({
   autoRegisterImplementations: false,
})
export abstract class INode {
   @Field()
   id!: string;
}

@InterfaceType({
   autoRegisterImplementations: false,
})
export abstract class ITableTimestemp extends INode {
   @Field()
   createdAt!: Date;

   @Field()
   updatedAt!: Date;
}
