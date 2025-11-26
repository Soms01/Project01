import { Entity, PrimaryGeneratedColumn, Column,ManyToOne, OneToMany } from 'typeorm';

import { practice_place } from './practice_place';
import { application } from './Aplication';


@Entity({ name: 'practice_place_manager' })
export class practice_place_manager {
    @PrimaryGeneratedColumn({ name: 'Id', type: 'bigint' })
  id: number;
  @Column({ name: 'Fullname', type:'varchar'})
  fullName: string;
  @Column({name:'practicePlaceId', type:'bigint'})
    practicePlaceId: number;
  @ManyToOne(() => practice_place, (pp) => pp.practiceplacemanager, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    practicePlace: practice_place;
  @OneToMany(() => application, (ap) => ap.practicePlaceManager)
  application: application[];
}
