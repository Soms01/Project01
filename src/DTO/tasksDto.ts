import { task } from '../orm/entities/task';

export class tasksDto {
    id: number;   
    name: string;      
    rating: number;
    
    applicationId: number; 

    constructor(taskEntity: task) {
        this.id = Number(taskEntity.id);
        this.name = taskEntity.name;
        this.rating = taskEntity.rating !== undefined ? taskEntity.rating : 0; 

        if (taskEntity.application) {
            this.applicationId = Number(taskEntity.application.id);
        } else {
            this.applicationId = Number(taskEntity.applicationId);
        }
    }
}