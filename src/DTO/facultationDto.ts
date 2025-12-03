import { facultation } from '../orm/entities/facultation';

export class facultationDto{
    Id: number;
    Name: string; 

    constructor(fac: facultation) {
        this.Id = fac.id;
        this.Name = fac.name;

    }
}