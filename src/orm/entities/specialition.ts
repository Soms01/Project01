import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { student } from './student';
import { facultation } from './facultation';

@Entity({ name: 'specialition' })
export class specialition {
@PrimaryGeneratedColumn({ name: 'Id', type: 'bigint' })
    id: number;
@Column({ name: 'Name',type:'varchar' })
    name: string;
    @Column({ name: 'Code',type:'smallint' })
    code: number;
@OneToMany(() => facultation, (fc) => fc.specialiton, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    facultation: facultation;
    @OneToMany(() => student, (st) => st.specialition)
    student: student[];
}