import { specialition } from '../orm/entities/specialization';
import { facultationDto } from './facultationDto';

export class specDto{
    Id: number;
    Name: string;
    code: number;
    facultation?: facultationDto | null;

    constructor(spec: specialition) {
        this.Id = spec.id;
        this.Name = spec.name;
        this.code = spec.code;
        this.facultation = spec.facultation ? new facultationDto(spec.facultation) : null;
    }
}