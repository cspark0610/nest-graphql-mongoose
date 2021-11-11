import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

//para typeorm tengo @Entity() como decorator
// y para los types de GraphQL tengo @ObjectType() como decorador

@Entity()
export class Lesson {
  //para mongodb se espera ub objeto como id
  @ObjectIdColumn()
  _id: string;
  @Column()
  name: string;
  @Column()
  startDate: string;
  @Column()
  endDate: string;
  //a cada Lesson le voy a asignar un array de students
  @Column()
  students: string[];
}
