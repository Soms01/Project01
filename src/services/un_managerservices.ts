import { getRepository } from 'typeorm';
import { un_managerDto } from '../DTO/un_managerDto';
import { university_manager } from '../orm/entities/university_manager';
import { CustomError } from '../utils/response/custom-error/CustomError';

export class un_managerservices {

    private unRepository = getRepository(university_manager);


    private relations = ['facultation']; 

    async getAllUniversity_managers() {
        const unmanagers = await this.unRepository.find({
            relations: this.relations 
        });
        return unmanagers.map((um) => new un_managerDto(um));
    }

    async getUniversity_managerById(id: number) {
        if (isNaN(id)) {
            throw new CustomError(400, 'Validation', 'invalid ID manager');
        }
        const un_manager = await this.unRepository.findOne({ 
            where: { id },
            relations: this.relations 
        });

        if (!un_manager) {
            throw new CustomError(404, 'General', 'manager not found');
        }

        return new un_managerDto(un_manager);
    }

    async createUniversity_manager(data: any){

        const un_manager = new university_manager();
        un_manager.fullName = data.fullname || data.Fullname;
    
        un_manager.facultationId = Number(data.facultationId || data.facultation_id);

        const created = await this.unRepository.save(un_manager);

        const reloaded = await this.unRepository.findOne({
            where: { id: created.id },
            relations: this.relations
        });

        if (!reloaded) throw new CustomError(500, 'General', 'Error reloading created manager');

        return new un_managerDto(reloaded);
    }

    async updateUniversity_manager(id: number, data: Partial<university_manager>) {
        if (isNaN(id)) {
            throw new CustomError(400, 'Validation', 'invalid ID manager');
        }
        
        const manager = await this.unRepository.findOne({ where: { id } });
        if (!manager) {
            throw new CustomError(404, 'General', 'manager not found ');
        }
        
        Object.assign(manager, data);
        await this.unRepository.save(manager);

        const reloaded = await this.unRepository.findOne({
            where: { id },
            relations: this.relations
        });

        if (!reloaded) throw new CustomError(500, 'General', 'Error reloading updated manager');

        return new un_managerDto(reloaded);
    }
        
    async deleteUniversity_manager(id: number) {
        if (isNaN(id)) {
            throw new CustomError(400, 'Validation', 'invalid ID manager');
        }
        
        const result = await this.unRepository.delete(id);
        if (!result.affected) {
            throw new CustomError(404, 'General', 'manager not found');
        }
        
        return { message: `manager with ID ${id} correctly deleted` };
    }
}