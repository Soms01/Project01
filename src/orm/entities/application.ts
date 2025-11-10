import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { practice_place } from './practice_place';
import { practice_place_manager } from './practice_place_manager';
import { student } from './student';
import { university_manager } from './university_manager';
import { task } from './task';

@Entity({ name: 'application' })
export class application {
    @PrimaryGeneratedColumn({ name: 'Id', type: 'bigint' })
  id: number;
  @Column({ type: 'date', name: 'dateFrom' })
  dateFrom: Date;
  @Column({ type: 'date', name: 'dateTo' })
  dateTo: Date;
  @Column({type:'varchar', name:'report'})
    report: string;
  @Column({type:'varchar', name:'type practice'})
    type_practice: string;

    @OneToMany(() => practice_place_manager, (ppm) => ppm.application, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    practice_place_manager: practice_place_manager;
    @OneToMany(() => student, (st) => st.application, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    student: student;
    @OneToMany(() => university_manager, (um) => um.application, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    university_manager: university_manager;
    @OneToMany(() => practice_place, (pp) => pp.application, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    practice_place: practice_place;
    @OneToMany(() =>task, (ts) => ts.application)
    task: task[];

}