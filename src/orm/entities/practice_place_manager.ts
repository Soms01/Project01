import { Entity, PrimaryGeneratedColumn, Column,ManyToOne, OneToMany } from 'typeorm';

import { practice_place } from './practice_place';
import { application } from './Aplication';


@Entity({ name: 'practice_place_manager' })
export class practice_place_manager {
    @PrimaryGeneratedColumn({ name: 'Id', type: 'bigint' })
  id: number;
  @Column({ name: 'Fullname', type:'varchar'})
  fullname: string;
  @Column({name:'placeid', type:'bigint'})
    ppid: number;
  @ManyToOne(() => practice_place, (pp) => pp.practice_place_manager, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    practice_place: practice_place;
  @OneToMany(() => application, (ap) => ap.practice_place_manager)
  application: application[];
}
