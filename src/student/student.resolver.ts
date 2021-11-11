import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { StudentType } from './student.type';
import { CreateStudentInput } from './student.input';

@Resolver(() => StudentType)
export class StudentResolver {
  //DENTRO DEL RESOLVER SE INYECTA EN EL CONSTRUCTOR EL SERVICIO HACIENDO UNA INSTANCIA DE ELLA
  constructor(private studentService: StudentService) {}

  @Mutation(() => StudentType)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return this.studentService.createStudent(createStudentInput);
  }
  @Query(() => [StudentType])
  getAllStudents() {
    return this.studentService.getAllStudents();
  }
  @Query(() => StudentType)
  getStudentById(@Args('id') id: string) {
    return this.studentService.getStudentById(id);
  }
}
