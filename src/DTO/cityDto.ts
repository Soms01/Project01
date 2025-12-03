import { city } from '../orm/entities/city';

export class cityDto{
    Id: number;
    Name: string; 

    constructor(city: city) {
        this.Id = city.id;
        this.Name = city.name;

    }
}