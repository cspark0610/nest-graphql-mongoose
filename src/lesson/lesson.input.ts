import { Field, InputType, ID } from '@nestjs/graphql';
import { MinLength, IsDateString, IsUUID } from 'class-validator';

//graphql classInput para hacer las validaciones
//cada campo del input debe ser DECORADA CON @Field()

//voy a instalar "class-validator" y class-transformer
@InputType()
export class CreateLessonInput {
  @MinLength(1) //valido que el campo Field llamado name tenga por lo menos 1 caracter
  @Field()
  name: string;

  @IsDateString()
  @Field()
  startDate: string;

  @IsDateString()
  @Field()
  endDate: string;

  @Field(() => [ID], { defaultValue: [] })
  students: string[];
}

/*
@MinLength(), 
@IsDateString() "2020-03-28T18:00:00Z" este formate de Date 
from "class-validator"

@Field, @InputTYpe() from "@nestjs/graphql"
ESTA CLASE CreateLessonInput va a ser usada en el servicio lesson.service.ts
*/
