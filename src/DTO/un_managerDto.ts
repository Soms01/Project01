import { university_manager } from '../orm/entities/university_manager';
import { facultationDto } from './facultationDto';

export class un_managerDto{
    Id: number;
    Fullname: string;
    facultation?: facultationDto | null;

    constructor(un_manager: university_manager) {
        this.Id = un_manager.id;
        this.Fullname = un_manager.fullName;
        this.facultation = un_manager.facultation ? new facultationDto(un_manager.facultation) : null;
    }
}