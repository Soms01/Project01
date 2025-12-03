import { task } from '../orm/entities/task';
import { applicationDto } from './applicationDto';

export class tasksDto{
    Id: number;
    Name: string;
    rating: number;
    applicationId?: applicationDto | null;

    constructor(tasks: task) {
        this.Id = tasks.id;
        this.Name = tasks.name;
        this.applicationId = tasks.applicationId ? new applicationDto(tasks.application) : null;

    }
}