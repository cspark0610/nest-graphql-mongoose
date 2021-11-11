import {
  Args,
  Mutation,
  Parent,
  Query,
  Resolver,
  ResolveField,
} from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { StudentService } from 'src/student/student.service';
import { CreateLessonInput } from './lesson.input';
import { AssignStudentsToLessonInput } from './assign-students-to-lesson-input';
import { Lesson } from './lesson.entity';

@Resolver(() => LessonType)
export class LessonResolver {
  //debo inyectar studentService tb para popular el campo students con un array de objetos de students
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}
  //aca defino las Queries o las Mutations ambas SON METODOS DE ESTA CLASE RESOLVER
  // si es una querie la tengo que decorar con @Query() fron nestjs/graphql
  @Query(() => LessonType)
  getLesson(@Args('id') id: string) {
    return this.lessonService.getLessonById(id);
  }
  @Query(() => [LessonType])
  getAllLessons() {
    return this.lessonService.getAllLessons();
  }
  //@Mutation(() => LessonType)
  //dentro del Resolver debo usar el decorador @Args si la mutation va a recibir parametros, dentro del playground van a figurar como Arguments en los docs
  // createLesson(
  //   @Args('name') name: string,
  //   @Args('startDate') startDate: string,
  //   @Args('endDate') endDate: string,
  // ) {
  //   return this.lessonService.createLesson(name, startDate, endDate);
  // }
  @Mutation(() => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return this.lessonService.createLesson(createLessonInput);
  }
  @Mutation(() => LessonType)
  assignStudentsToLesson(
    @Args('assignStudentsToLessonInput')
    assignStudentsToLessonInput: AssignStudentsToLessonInput,
  ) {
    const { lessonId, studentIds } = assignStudentsToLessonInput;
    return this.lessonService.assignStudentsToLesson(lessonId, studentIds);
  }
  @ResolveField()
  //se usa para "popular" el field students de la mutation assignStudentsToLesson
  //para los ResolverField usar las entitiy.ts
  async students(@Parent() lesson: Lesson) {
    console.log(lesson);
    const { students } = lesson;
    return this.studentService.getManyStudents(students);
  }
}
