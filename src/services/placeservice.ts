import { getRepository } from 'typeorm';
import { placeDto } from '../DTO/placeDto';
import { practice_place } from '../orm/entities/practice_place';
import { CustomError } from '../utils/response/custom-error/CustomError';

export class placeservices {

    private placeRepository = getRepository(practice_place);

    async getAllPlaces() {

        const places = await this.placeRepository.find({
            relations: ['city'] 
        });
        return places.map((p) => new placeDto(p));
    }

    async getPlaceById(id: number) {
        if (isNaN(id)) {
            throw new CustomError(400, 'Validation', 'invalid ID place');
        }

        const place = await this.placeRepository.findOne({ 
            where: { id },
            relations: ['city'] 
        });
        
        if (!place) {
            throw new CustomError(404, 'General', 'place not found');
        }

        return new placeDto(place);
    }

    async createPlace(data: Partial<practice_place>){
        const place = this.placeRepository.create(data);
        const created = await this.placeRepository.save(place);

        
        const reloadedPlace = await this.placeRepository.findOne({
            where: { id: created.id },
            relations: ['city']
        });

        if (!reloadedPlace) {
             throw new CustomError(500, 'General', 'Error reloading created place');
        }

        return new placeDto(reloadedPlace);
    }

    async updatePlace(id: number, data: Partial<practice_place>) {
        if (isNaN(id)) {
            throw new CustomError(400, 'Validation', 'invalid ID place');
        }

        const place = await this.placeRepository.findOne({ where: { id } });
        
        if (!place) {
            throw new CustomError(404, 'General', 'place not found ');
        }

        Object.assign(place, data);
        await this.placeRepository.save(place); // Зберігаємо зміни

        
        const updatedWithRelations = await this.placeRepository.findOne({
            where: { id },
            relations: ['city']
        });

         if (!updatedWithRelations) {
             throw new CustomError(500, 'General', 'Error reloading updated place');
        }

        return new placeDto(updatedWithRelations);
    }

    async deletePlace(id: number) {
        if (isNaN(id)) {
            throw new CustomError(400, 'Validation', 'invalid ID place');
        }

        const result = await this.placeRepository.delete(id);
        if (!result.affected) {
            throw new CustomError(404, 'General', 'place not found');
        }

        return { message: `place with ID ${id} correctly deleted` };
    }
}