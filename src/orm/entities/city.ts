import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { practice_place } from './practice_place';

@Entity({ name: 'City' })
export class city {
    @PrimaryGeneratedColumn({ name: 'Id', type: 'bigint' })
  id: number;
  @Column({ name: 'Name',type:'varchar'})
  name: string;
  @OneToMany(() => practice_place, (pp) => pp.city)
  practice_place: practice_place[];
  
}
