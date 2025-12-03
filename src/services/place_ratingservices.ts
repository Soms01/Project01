import { getRepository } from 'typeorm';
import { practice_place_rating } from '../orm/entities/practice_place_rating';
import { place_ratingDto } from '../DTO/place_ratingDto'
import { CustomError } from '../utils/response/custom-error/CustomError';

export class ratingservices {
    private ratingRepository = getRepository(practice_place_rating);

    async getAllRatings() {
    const ratings = await this.ratingRepository.find();
    return ratings.map((ts) => new place_ratingDto(ts));
    }

    async getRatingById(id: number) {
    if (isNaN(id)) {
      throw new CustomError(400, 'Validation', 'invalid ID rating');
    }
    const rating = await this.ratingRepository.findOne({ where: { id } });
    if (!rating) {
      throw new CustomError(404, 'General', 'rating not found');
    }

    return new place_ratingDto(rating);
    }

    async createRating(data: Partial<practice_place_rating>){
        const rating = this.ratingRepository.create(data);
        const created = await this.ratingRepository.save(rating);
        return new place_ratingDto(created);

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
    const updated = await this.ratingRepository.save(rating);
    return new place_ratingDto(updated);
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