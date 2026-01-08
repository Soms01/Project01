import { getRepository } from 'typeorm';
import { specialition } from '../orm/entities/specialization'; // Перевір, чи файл називається правильно
import { specDto } from '../DTO/specDto';
import { CustomError } from '../utils/response/custom-error/CustomError';

export class SpecServices { 
    
    private specRepository = getRepository(specialition);

    private relations = ['facultation']; 

    async getAllSpecialitions() {
        const specialitions = await this.specRepository.find({
            relations: this.relations 
        });
        return specialitions.map((spec) => new specDto(spec));
    }

    async getSpecialitionById(id: number) {
        if (isNaN(id)) {
            throw new CustomError(400, 'Validation', 'invalid ID specialition');
        }
        const specialition = await this.specRepository.findOne({ 
            where: { id },
            relations: this.relations
        });

        if (!specialition) {
            throw new CustomError(404, 'General', 'specialition not found');
        }

        return new specDto(specialition);
    }

    async createSpecialition(data: Partial<specialition>){
        const specialition = this.specRepository.create(data);
        const created = await this.specRepository.save(specialition);
        
        const reloaded = await this.specRepository.findOne({
            where: { id: created.id },
            relations: this.relations
        });

        if (!reloaded) throw new CustomError(500, 'General', 'Error reloading created specialization');

        return new specDto(reloaded);
    }

    async updateSpecialition(id: number, data: Partial<specialition>) {
        if (isNaN(id)) {
            throw new CustomError(400, 'Validation', 'invalid ID specialition');
        }
        
        const specialition = await this.specRepository.findOne({ where: { id } });
        if (!specialition) {
            throw new CustomError(404, 'General', 'specialition not found ');
        }

        Object.assign(specialition, data);
        await this.specRepository.save(specialition);

        const reloaded = await this.specRepository.findOne({
            where: { id },
            relations: this.relations
        });

        if (!reloaded) throw new CustomError(500, 'General', 'Error reloading updated specialization');

        return new specDto(reloaded);
    }

    async deleteSpecialition(id: number) {
        if (isNaN(id)) {
            throw new CustomError(400, 'Validation', 'invalid ID specialition');
        }

        const result = await this.specRepository.delete(id);
        if (!result.affected) {
            throw new CustomError(404, 'General', 'specialition not found');
        }

        return { message: `specialition with ID ${id} correctly deleted` };
    }
}