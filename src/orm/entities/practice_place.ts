import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';


import { application } from './Aplication';
import { practice_place_rating } from './practice_place_rating';
import { practice_place_manager } from './practice_place_manager';
import { city } from './city';

@Entity({ name: 'practice_place' })
export class practice_place {
    @PrimaryGeneratedColumn({ name: 'Id', type: 'bigint' })
    id: number;
    @Column({type:'text', name:'description'})
    description: string;
    @Column({ name: 'Name', type:'varchar' })
    name: string;
    @Column({ name: 'Popularity', type: 'smallint'})
    popularity: number;
    @Column({name:'cityId', type:'bigint'})
    cityId: number;
    @ManyToOne(() => city, (c) => c.practice_place, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  city: city;
  @OneToMany(() => practice_place_manager, (ppm) => ppm.practicePlace)
  practiceplacemanager: practice_place_manager[];
  @OneToMany(() => practice_place_rating, (ppr) => ppr.practicePlace)
  practiceplacerating: practice_place_rating[];
  @OneToMany(() => application, (ap) => ap.practicePlace)
  application: application[];
}
