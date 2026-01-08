import { practice_place_rating } from '../orm/entities/practice_place_rating';

export class place_ratingDto {
    id: number;
    rating: number;
    
    placeId: number;   
    studentId: number;

    constructor(entity: practice_place_rating) {
        this.id = Number(entity.id);
        this.rating = entity.rating;


        if (entity.student && typeof entity.student === 'object') {
            this.studentId = Number(entity.student.id);
        } else {
            this.studentId = Number(entity.studentId);
        }

        if (entity.practicePlace && typeof entity.practicePlace === 'object') {

            this.placeId = Number(entity.practicePlace.id);
        } else {
            this.placeId = Number(entity.practicePlaceId);
        }
    }
}