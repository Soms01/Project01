import { practice_place_rating } from '../orm/entities/practice_place_rating';
import { studentDto } from './studentDto';
import { placeDto } from './placeDto';
import { practice_place } from 'orm/entities/practice_place';

export class place_ratingDto{
    Id: number;
    rating: number;
    placeid?: placeDto |null;
    studentId?: studentDto | null;

    constructor(place_rating: practice_place_rating) {
        this.Id = place_rating.id;
        this.rating = place_rating.rating;
        this.studentId = place_rating.studentId ? new studentDto(place_rating.student) : null;
        this.placeid = place_rating.practicePlaceId ? new placeDto(place_rating.practicePlace) : null;

    }
}