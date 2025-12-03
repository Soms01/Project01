import { practice_place } from '../orm/entities/practice_place';
import { cityDto } from './cityDto';

export class placeDto{
    Id: number;
    description: string; 
    Name: string;
    popularity: number;
    city?: cityDto |null;

    constructor(place: practice_place) {
        this.Id = place.id;
        this.Name = place.name;
        this.description = place.description;
        this.popularity = place.popularity;
        this.city = place.cityId ? new cityDto(place.city) : null;

    }
}