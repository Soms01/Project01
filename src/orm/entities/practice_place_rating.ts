import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

import { practice_place } from './practice_place';
import { student } from './student';

@Entity({ name: 'practice_place_rating' })
export class practice_place_rating {
    @PrimaryGeneratedColumn({ name: 'Id', type: 'bigint' })
  id: number;
    @Column({type:'smallint', name:'rating'})
    rating: bigint;
    @Column({name:'practicePlaceId', type:'bigint'})
    practicePlaceId: number;
    @Column({name:'studentid', type:'bigint'})
    studentid: number;
    @ManyToMany(() => practice_place, (pp) => pp.practice_place_rating, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
        practice_place: practice_place;
        @ManyToMany(() => student, (st) => st.practice_place_rating, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
        student: student;
}
