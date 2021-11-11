import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateLessonInput } from './lesson.input';
import { LessonType } from './lesson.type';

@Injectable()
export class LessonService {
  //LessonService debe tener inyectado una instancia del lessonRepository, la misma esta dentra del constructor
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}
  //METODOS

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate, students } = createLessonInput;
    const lesson = await this.lessonRepository.create({
      _id: uuidv4(), //en mongodb el campo del id es _id
      name,
      startDate,
      endDate,
      students,
    });
    return this.lessonRepository.save(lesson);
  }

  async getLessonById(id: string): Promise<Lesson> {
    return await this.lessonRepository.findOne({ _id: id });
  }
  //metodo para traer todas las lessons
  async getAllLessons(): Promise<Lesson[]> {
    return await this.lessonRepository.find();
  }
  async assignStudentsToLesson(
    lessonId: string,
    studentIds: string[],
  ): Promise<LessonType> {
    const lesson = await this.lessonRepository.findOne({ _id: lessonId });
    //console.log(lesson);
    lesson.students = [...lesson.students, ...studentIds];
    return this.lessonRepository.save(lesson);
  }
}
