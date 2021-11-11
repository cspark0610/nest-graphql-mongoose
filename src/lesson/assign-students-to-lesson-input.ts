import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class AssignStudentsToLessonInput {
  @IsUUID()
  @Field(() => ID)
  lessonId: string;

  @IsUUID('4', { each: true }) //voy a validar cada elemento del array por eso debo pasar el objeto como 2do parametro
  @Field(() => [ID])
  studentIds: string[];
}
