import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentInput } from './student.input';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}
  //en los metodos del servicio voy a meter como parametro el dto o el
  // student.input.ts
  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const { firstName, lastName } = createStudentInput;
    const student = await this.studentRepository.create({
      _id: uuidv4(),
      firstName,
      lastName,
    });
    return this.studentRepository.save(student);
  }
  async getAllStudents(): Promise<Student[]> {
    return await this.studentRepository.find();
  }
  async getStudentById(id: string): Promise<Student> {
    return await this.studentRepository.findOne({ _id: id });
  }
  //popular el field students con obj {firstName. lastName }
  //desde el resolver.ts usar el @ResolverField()
  async getManyStudents(studentsIds: string[]): Promise<Student[]> {
    //debo buscar dntro de la collection de Students aquellos(where)
    //cuyos ids sean los que les paso por parámetro
    //usar el operador $in de mongoose
    //voy a recibir como parametro un array con strings de ids
    return await this.studentRepository.find({
      where: {
        id: { $in: studentsIds },
      },
    });
  }
}
