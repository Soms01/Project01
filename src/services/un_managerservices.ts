import { getRepository } from 'typeorm';
import { un_managerDto } from '../DTO/un_managerDto';
import { university_manager } from '../orm/entities/university_manager';
import { CustomError } from '../utils/response/custom-error/CustomError';

export class un_managerservices { // Краще: UniversityManagerServices
    // 👇 ВАЖЛИВО: Перевір у файлі 'orm/entities/university_manager.ts'.
    // Скоріш за все, менеджер прив'язаний до факультету.
    // Якщо поле називається 'facultation', залишай як є.
    // Якщо 'faculty', зміни на 'faculty'.
    private relations = ['facultation'];

    async getAllUniversity_managers() {
        const unmanagers = await getRepository(university_manager).find({
            relations: this.relations // ✅ Завантажуємо зв'язки
        });
        return unmanagers.map((um) => new un_managerDto(um));
    }

    async getUniversity_managerById(id: number) {
        if (isNaN(id)) {
            throw new CustomError(400, 'Validation', 'invalid ID manager');
        }
        const un_manager = await getRepository(university_manager).findOne({
            where: { id },
            relations: this.relations // ✅ Завантажуємо зв'язки
        });

        if (!un_manager) {
            throw new CustomError(404, 'General', 'manager not found');
        }

        return new un_managerDto(un_manager);
    }

    async createUniversity_manager(data: Partial<university_manager>){
        const un_manager = getRepository(university_manager).create(data);
        const created = await getRepository(university_manager).save(un_manager);

        // 🔥 ПЕРЕЗАВАНТАЖЕННЯ:
        // Щоб отримати повні дані про факультет для DTO
        const reloaded = await getRepository(university_manager).findOne({
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

        const manager = await getRepository(university_manager).findOne({ where: { id } });
        if (!manager) {
            throw new CustomError(404, 'General', 'manager not found ');
        }

        Object.assign(manager, data);
        await getRepository(university_manager).save(manager);

        // 🔥 ПЕРЕЗАВАНТАЖЕННЯ:
        const reloaded = await getRepository(university_manager).findOne({
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

        const result = await getRepository(university_manager).delete(id);
        if (!result.affected) {
            throw new CustomError(404, 'General', 'manager not found');
        }

        return { message: `manager with ID ${id} correctly deleted` };
    }
}
