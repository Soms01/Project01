import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { student } from './student';
import { facultation } from './facultation';

@Entity({ name: 'specialition' })
export class specialition {
  @PrimaryGeneratedColumn({ name: 'Id', type: 'bigint' })
  id: number;

  @Column({ name: 'Name', type:'varchar' })
  name: string;
  @Column({ name: 'Code', type:'smallint'})
  code: number;

  @ManyToOne(() => facultation, (fc) => fc.specialition, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  facultation: facultation;


  @OneToMany(() => student, (st) => st.specialition)
  student: student[];
}
