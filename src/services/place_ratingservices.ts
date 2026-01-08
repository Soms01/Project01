import { getRepository } from 'typeorm';
import { practice_place_rating } from '../orm/entities/practice_place_rating';
import { place_ratingDto } from '../DTO/place_ratingDto';
import { CustomError } from '../utils/response/custom-error/CustomError';

export class RatingServices {

    private ratingRepository = getRepository(practice_place_rating);

    private relations = [
      'student',
      'student.specialition',
      'student.specialition.facultation',
      'practicePlace',
      'practicePlace.city'
    ];

    async getAllRatings() {
        const ratings = await this.ratingRepository.find({
            relations: this.relations 
        });
        return ratings.map((r) => new place_ratingDto(r));
    }

    async getRatingById(id: number) {
        if (isNaN(id)) {
            throw new CustomError(400, 'Validation', 'invalid ID rating');
        }
        const rating = await this.ratingRepository.findOne({ 
            where: { id },
            relations: this.relations
        });

        if (!rating) {
            throw new CustomError(404, 'General', 'rating not found');
        }

        return new place_ratingDto(rating);
    }

    async createRating(data: Partial<practice_place_rating>){
        const rating = this.ratingRepository.create(data);
        const created = await this.ratingRepository.save(rating);

        const reloaded = await this.ratingRepository.findOne({
            where: { id: created.id },
            relations: this.relations
        });

        if (!reloaded) throw new CustomError(500, 'General', 'Error reloading created rating');

        return new place_ratingDto(reloaded);
    }

    async updateRating(id: number, data: Partial<practice_place_rating>) {
        if (isNaN(id)) {
            throw new CustomError(400, 'Validation', 'invalid ID rating');
        }
        
        const rating = await this.ratingRepository.findOne({ where: { id } });
        if (!rating) {
            throw new CustomError(404, 'General', 'rating not found ');
        }

        Object.assign(rating, data);
        await this.ratingRepository.save(rating);

        
        const reloaded = await this.ratingRepository.findOne({
            where: { id },
            relations: this.relations
        });

        if (!reloaded) throw new CustomError(500, 'General', 'Error reloading updated rating');

        return new place_ratingDto(reloaded);
    }

    async deleteRating(id: number) {
        if (isNaN(id)) {
            throw new CustomError(400, 'Validation', 'invalid ID rating');
        }

        const result = await this.ratingRepository.delete(id);
        if (!result.affected) {
            throw new CustomError(404, 'General', 'rating not found');
        }

        return { message: `rating with ID ${id} correctly deleted` };
    }
}