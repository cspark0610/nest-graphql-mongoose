import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

//dto
@InputType()
export class CreateStudentInput {
  @MinLength(1) //valido que el campo Field llamado name tenga por lo menos 1 caracter
  @Field()
  firstName: string;
  @MinLength(1)
  @Field()
  lastName: string;
}
