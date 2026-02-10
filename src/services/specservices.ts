import { getRepository } from 'typeorm';
import { specialition } from '../orm/entities/specialization'; // Перевір, чи файл називається правильно
import { specDto } from '../DTO/specDto';
import { CustomError } from '../utils/response/custom-error/CustomError';

// Бажано SpecServices (PascalCase)
export class SpecServices {
    // 👇 Припускаю, що спеціальність прив'язана до факультету.
    // Перевір у файлі entity/specialization.ts, як називається поле зв'язку:
    // 'facultation' чи 'faculty'?
    private relations = ['facultation'];

    async getAllSpecialitions() {
        const specialitions = await getRepository(specialition).find({
            relations: this.relations // ✅ Додаємо зв'язки, якщо треба
        });
        return specialitions.map((spec) => new specDto(spec));
    }

    async getSpecialitionById(id: number) {
        if (isNaN(id)) {
            throw new CustomError(400, 'Validation', 'invalid ID specialition');
        }
        const specialitionEntity = await getRepository(specialition).findOne({
            where: { id },
            relations: this.relations // ✅ Додаємо зв'язки
        });

        if (!specialitionEntity) {
            throw new CustomError(404, 'General', 'specialition not found');
        }

        return new specDto(specialitionEntity);
    }

    async createSpecialition(data: Partial<specialition>){
        const specialitionEntity = getRepository(specialition).create(data);
        const created = await getRepository(specialition).save(specialitionEntity);

        // 🔥 ПЕРЕЗАВАНТАЖЕННЯ (важливо, якщо DTO використовує дані факультету)
        const reloaded = await getRepository(specialition).findOne({
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

        const specialitionEntity = await getRepository(specialition).findOne({ where: { id } });
        if (!specialitionEntity) {
            throw new CustomError(404, 'General', 'specialition not found ');
        }

        Object.assign(specialitionEntity, data);
        await getRepository(specialition).save(specialitionEntity);

        // 🔥 ПЕРЕЗАВАНТАЖЕННЯ
        const reloaded = await getRepository(specialition).findOne({
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

        const result = await getRepository(specialition).delete(id);
        if (!result.affected) {
            throw new CustomError(404, 'General', 'specialition not found');
        }

        return { message: `specialition with ID ${id} correctly deleted` };
    }
}