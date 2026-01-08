import { application } from '../orm/entities/Aplication';
import { studentDto } from './studentDto';
import { placeDto } from './placeDto';
import { un_managerDto } from './un_managerDto';
import { place_managerDto } from './place_managerDto';

export class applicationDto {
    Id: number;
    dateFrom: Date;
    dateTo: Date;
    report: string;
    type_practice: string;
    studentid?: studentDto | null;
    placeid?: placeDto | null;
    un_manager?: un_managerDto | null;
    place_manager?: place_managerDto | null;

    constructor(application: application) {
        this.Id = application.id;
        this.report = application.report;
        
        this.dateFrom = (application as any).date_from || (application as any).dateFrom;
        this.dateTo = (application as any).date_to || (application as any).dateTo;
        this.type_practice = (application as any).type_practice || (application as any).typePractice || "";

        const studObj = application.student || (application as any).student;
        this.studentid = studObj ? new studentDto(studObj) : null;

        const placeObj = (application as any).practice_place || (application as any).practicePlace;
        this.placeid = placeObj ? new placeDto(placeObj) : null;

        const unManObj = (application as any).university_manager || (application as any).universityManager;
        this.un_manager = unManObj ? new un_managerDto(unManObj) : null;

        const plManObj = (application as any).practice_place_manager || (application as any).practicePlaceManager;
        this.place_manager = plManObj ? new place_managerDto(plManObj) : null;
    }
}