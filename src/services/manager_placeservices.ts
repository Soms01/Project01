import { getRepository } from 'typeorm';
import { place_managerDto } from '../DTO/place_managerDto';
import { practice_place_manager } from '../orm/entities/practice_place_manager';
import { CustomError } from '../utils/response/custom-error/CustomError';

export class placeservices {

    private place_managerRepository = getRepository(practice_place_manager);

    async getAllPlace_managers() {
        const ppmanagers = await this.place_managerRepository.find();
        return ppmanagers.map((ppm) => new place_managerDto(ppm));
        }
    
        async getPlace_managerById(id: number) {
        if (isNaN(id)) {
          throw new CustomError(400, 'Validation', 'invalid ID manager');
        }
        const place_manager = await this.place_managerRepository.findOne({ where: { id } });
        if (!place_manager) {
          throw new CustomError(404, 'General', 'manager not found');
        }
    
        return new place_managerDto(place_manager);
        }
    
        async createPlace_manager(data: Partial<practice_place_manager>){
            const place_manager = this.place_managerRepository.create(data);
            const created = await this.place_managerRepository.save(place_manager);
            return new place_managerDto(created);
    
        }
        async updatePlace_manager(id: number, data: Partial<practice_place_manager>) {
            if (isNaN(id)) {
            throw new CustomError(400, 'Validation', 'invalid ID manager');
        }
            const manager = await this.place_managerRepository.findOne({ where: { id } });
            if (!manager) {
            throw new CustomError(404, 'General', 'manager not found ');
        }
        
            Object.assign(manager, data);
            const updated = await this.place_managerRepository.save(manager);
            return new place_managerDto(updated);
        }
        
        async deletePlace_manager(id: number) {
            if (isNaN(id)) {
            throw new CustomError(400, 'Validation', 'invalid ID manager');
        }
        
            const result = await this.place_managerRepository.delete(id);
            if (!result.affected) {
            throw new CustomError(404, 'General', 'manager not found');
        }
        
            return { message: `manager with ID ${id} correctly deleted` };
        }
}