import { student } from '../orm/entities/student';
import { specDto } from './specDto';

export class studentDto{
    Id: number;
    Fullname: string;
    specialition?: specDto | null;

    constructor(student: student) {
        this.Id = student.id;
        this.Fullname = student.fullname;
        this.specialition = student.specialition ? new specDto(student.specialition) : null;
    }
}