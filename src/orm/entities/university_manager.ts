import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';


import { application } from './Aplication';
import { facultation } from './facultation';


@Entity({ name: 'university_manager' })
export class university_manager {
    @PrimaryGeneratedColumn({ name: 'Id', type: 'bigint' })
  id: number;
  @Column({ name: 'Fullname', type:'varchar' })
  fullname: string;
  @Column({name:'fac', type:'bigint'})
    fcid: number;


  @ManyToOne(() => facultation, (fc) => fc.university_manager, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    facultation: facultation;
    @OneToMany(() => application, (ap) => ap.university_manager)
  application: application[];
}
