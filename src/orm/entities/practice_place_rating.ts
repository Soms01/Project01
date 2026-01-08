import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { practice_place } from './practice_place';
import { student } from './student';

@Entity({ name: 'practice_place_rating' })
export class practice_place_rating {
    @PrimaryGeneratedColumn({ name: 'Id', type: 'bigint' })
  id: number;
    @Column({type:'smallint', name:'rating'})
    rating: number;
    @Column({name:'practicePlaceId', type:'bigint'})
    practicePlaceId: number;
    @Column({name:'studentId', type:'bigint'})
    studentId: number;
    @ManyToOne(() => practice_place, (pp) => pp.practiceplacerating, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
        practicePlace: practice_place;
        @ManyToOne(() => student, (st) => st.practiceplacerating, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
        student: student;
}
