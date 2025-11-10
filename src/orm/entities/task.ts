import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';


import { application } from './Aplication';


@Entity({ name: 'task' })
export class task {
    @PrimaryGeneratedColumn({ name: 'Id', type: 'bigint' })
  id: number;
   @Column({ name: 'Name', type:'varchar' })
  name: string;
   @Column({ type:'smallint',name: 'rating' })
  rating: number;


  @ManyToOne(() => application, (ap) => ap.task, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
      application: application;
}
