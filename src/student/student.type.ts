import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType('Student') //EN EL PLAYGROUND VOY A VER type Student {} Y NO type StudentType {}
export class StudentType {
  @Field(() => ID)
  _id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
