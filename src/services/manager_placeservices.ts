import { getRepository } from 'typeorm';
import { place_managerDto } from '../DTO/place_managerDto';
import { practice_place_manager } from '../orm/entities/practice_place_manager';
import { CustomError } from '../utils/response/custom-error/CustomError';

// 🔥 ВИПРАВЛЕНО: Змінив назву класу, щоб не було конфлікту з placeservices
export class PlaceManagerServices {
    // 👇 Припускаю, що менеджер прив'язаний до місця практики.
    // Перевір у entity practice_place_manager, чи називається поле 'practice_place'
    private relations = ['practice_place'];

    async getAllPlace_managers() {
        const ppmanagers = await getRepository(practice_place_manager).find({
            relations: this.relations // ✅ Додали зв'язки
        });
        return ppmanagers.map((ppm) => new place_managerDto(ppm));
    }

    async getPlace_managerById(id: number) {
        if (isNaN(id)) {
            throw new CustomError(400, 'Validation', 'invalid ID manager');
        }
        const place_manager = await getRepository(practice_place_manager).findOne({
            where: { id },
            relations: this.relations // ✅ Додали зв'язки
        });

        if (!place_manager) {
            throw new CustomError(404, 'General', 'manager not found');
        }

        return new place_managerDto(place_manager);
    }

    async createPlace_manager(data: Partial<practice_place_manager>){
        const place_manager = getRepository(practice_place_manager).create(data);
        const created = await getRepository(practice_place_manager).save(place_manager);

        // 🔥 ПЕРЕЗАВАНТАЖЕННЯ (щоб DTO не впав, якщо там є звернення до practice_place)
        const reloaded = await getRepository(practice_place_manager).findOne({
            where: { id: created.id },
            relations: this.relations
        });

        if (!reloaded) throw new CustomError(500, 'General', 'Error reloading created manager');

        return new place_managerDto(reloaded);
    }

    async updatePlace_manager(id: number, data: Partial<practice_place_manager>) {
        if (isNaN(id)) {
            throw new CustomError(400, 'Validation', 'invalid ID manager');
        }

        const manager = await getRepository(practice_place_manager).findOne({ where: { id } });
        if (!manager) {
            throw new CustomError(404, 'General', 'manager not found ');
        }

        Object.assign(manager, data);
        await getRepository(practice_place_manager).save(manager);

        // 🔥 ПЕРЕЗАВАНТАЖЕННЯ
        const reloaded = await getRepository(practice_place_manager).findOne({
            where: { id },
            relations: this.relations
        });

        if (!reloaded) throw new CustomError(500, 'General', 'Error reloading updated manager');

        return new place_managerDto(reloaded);
    }

    async deletePlace_manager(id: number) {
        if (isNaN(id)) {
            throw new CustomError(400, 'Validation', 'invalid ID manager');
        }

        const result = await getRepository(practice_place_manager).delete(id);
        if (!result.affected) {
            throw new CustomError(404, 'General', 'manager not found');
        }

        return { message: `manager with ID ${id} correctly deleted` };
    }
}
