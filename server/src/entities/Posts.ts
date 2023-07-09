import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Post {
  @Field(() => Int) // this is for graphql
  @PrimaryKey()
  id!: number;

  @Field()
  @Property()
  createdAt?: Date = new Date();

  @Field()
  @Property({ onUpdate: () => new Date() })
  updatedAt?: Date = new Date();

  @Field(() => String) // this is for graphql
  @Property({ type: "text" })
  title!: string;
}
