import { Field, ObjectType, ID } from '@nestjs/graphql';
import { StudentType } from '../student/student.type';

@ObjectType('Lesson') //quiero que la clase ahora se llame 'Lesson'
export class LessonType {
  @Field(() => ID)
  _id: string;

  @Field()
  name: string;

  @Field()
  startDate: string;

  @Field()
  endDate: string;

  @Field(() => [StudentType]) //aca el Resolver va a retornar los Types
  students: string[];
}
