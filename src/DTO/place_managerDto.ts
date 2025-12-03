import { placeDto } from './placeDto';
import { practice_place_manager } from '../orm/entities/practice_place_manager';

export class place_managerDto{
    Id: number;
    Fullname: string;
    placeid?: placeDto |null;

    constructor(place_manager: practice_place_manager) {
        this.Id = place_manager.id;
        this.Fullname = place_manager.fullName;
        this.placeid = place_manager.practicePlaceId ? new placeDto(place_manager.practicePlace) : null;

    }
}