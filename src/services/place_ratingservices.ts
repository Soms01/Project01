import { getRepository } from 'typeorm';
import { practice_place_rating } from '../orm/entities/practice_place_rating';
import { place_ratingDto } from '../DTO/place_ratingDto';
import { CustomError } from '../utils/response/custom-error/CustomError';

export class RatingServices { // Бажано називати класи з великої літери
    // 👇 Список зв'язків. Перевір у entity 'practice_place_rating',
    // чи дійсно поля називаються 'student' та 'practice_place'
    private relations = ['student', 'practice_place'];

    async getAllRatings() {
        const ratings = await getRepository(practice_place_rating).find({
            relations: this.relations // ✅ Додали relations
        });
        return ratings.map((r) => new place_ratingDto(r));
    }

    async getRatingById(id: number) {
        if (isNaN(id)) {
            throw new CustomError(400, 'Validation', 'invalid ID rating');
        }
        const rating = await getRepository(practice_place_rating).findOne({
            where: { id },
            relations: this.relations // ✅ Додали relations
        });

        if (!rating) {
            throw new CustomError(404, 'General', 'rating not found');
        }

        return new place_ratingDto(rating);
    }

    async createRating(data: Partial<practice_place_rating>){
        const rating = getRepository(practice_place_rating).create(data);
        const created = await getRepository(practice_place_rating).save(rating);

        // 🔥 ПЕРЕЗАВАНТАЖЕННЯ:
        // TypeORM save() не повертає зв'язки. Треба дістати їх окремим запитом.
        const reloaded = await getRepository(practice_place_rating).findOne({
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

        const rating = await getRepository(practice_place_rating).findOne({ where: { id } });
        if (!rating) {
            throw new CustomError(404, 'General', 'rating not found ');
        }

        Object.assign(rating, data);
        await getRepository(practice_place_rating).save(rating);

        // 🔥 ПЕРЕЗАВАНТАЖЕННЯ:
        const reloaded = await getRepository(practice_place_rating).findOne({
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

        const result = await getRepository(practice_place_rating).delete(id);
        if (!result.affected) {
            throw new CustomError(404, 'General', 'rating not found');
        }

        return { message: `rating with ID ${id} correctly deleted` };
    }
}
