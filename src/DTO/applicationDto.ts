import { application } from '../orm/entities/Aplication';
import { studentDto } from './studentDto';
import { placeDto } from './placeDto';
import { un_managerDto } from './un_managerDto';
import { place_managerDto } from './place_managerDto';

export class applicationDto{
    Id: number;
    dateFrom: Date;
    dateTo: Date;
    report: string;
    type_practice: string;
    studentid?: studentDto | null;
    placeid?: placeDto |null;
    un_manager?: un_managerDto |null;
    place_manager?: place_managerDto |null;

    constructor(application: application) {
        this.Id = application.id;
        this.report = application.report;
        this.studentid = application.student ? new studentDto(application.student) : null;
        this.placeid = application.practicePlaceId ? new placeDto(application.practicePlace) : null;
        this.un_manager = application.universityManager ? new un_managerDto(application.universityManager) : null;
        this.place_manager = application.practicePlaceManager ? new place_managerDto(application.practicePlaceManager) : null;
    }
}