import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';


import { application } from './Aplication';
import { specialition } from './specialization';
import { practice_place_rating } from './practice_place_rating';


@Entity({ name: 'student' })
export class student {
    @PrimaryGeneratedColumn({ name: 'Id', type: 'bigint' })
  id: number;
  @Column({ name: 'Fullname', type:'varchar' })
  fullname: string;
  @Column({name:'specialitionId', type:'bigint'})
    specialitionId: number;


  @ManyToOne(() => specialition, (sp) => sp.student, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
      specialition: specialition;
  @OneToMany(() =>practice_place_rating, (ppr) => ppr.student)
    practice_place_rating: practice_place_rating[];
  @OneToMany(() =>application, (ap) => ap.student)
    application: application[];


}
