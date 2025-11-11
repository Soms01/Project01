import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { specialition } from './specialization';
import { university_manager } from './university_manager';

@Entity({ name: 'facultation' })
export class facultation {
    @PrimaryGeneratedColumn({ name: 'Id', type: 'bigint' })
  id: number;
  @Column({ name: 'Name', type:'varchar' })
  name: string;
  @OneToMany(() => specialition, (sp) => sp.facultation)
    specialition: specialition[];
  @OneToMany(() => university_manager, (um) => um.facultation)
    university_manager: university_manager[];
}
