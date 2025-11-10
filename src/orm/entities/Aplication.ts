import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';


import { practice_place } from './practice_place';
import { practice_place_manager } from './practice_place_manager';
import { student } from './student';
import { university_manager } from './university_manager';
import { task } from './task';


@Entity({ name: 'application' })
export class application {
    @PrimaryGeneratedColumn({ name: 'Id', type: 'bigint' })
  id: number;
  @Column({ type: 'date', name: 'DateFrom' })
  dateFrom: Date;
  @Column({ type: 'date', name: 'DateTo' })
  dateTo: Date;
  @Column({type:'text', name:'report'})
    report: string;
  @Column({type:'varchar', name:'type practice'})
    type_practice: string;


    @ManyToOne(() => practice_place_manager, (ppm) => ppm.application, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    practice_place_manager: practice_place_manager;
    @ManyToOne(() => student, (st) => st.application, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    student: student;
    @ManyToOne(() => university_manager, (um) => um.application, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    university_manager: university_manager;
    @ManyToOne(() => practice_place, (pp) => pp.application, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    practice_place: practice_place;
    @OneToMany(() =>task, (ts) => ts.application)
    task: task[];


}
