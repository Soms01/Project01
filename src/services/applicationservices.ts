import { getRepository } from 'typeorm';
import { application } from '../orm/entities/Aplication'; // Перевір, чи файл називається Aplication чи Application
import { applicationDto } from '../DTO/applicationDto';
import { CustomError } from '../utils/response/custom-error/CustomError';

export class applicationservices {
  // Виносимо список зв'язків у змінну, щоб не дублювати код
  private relations = [
    'student',
    'practice_place',
    'practice_place_manager',
    'university_manager'
  ];

  async getAllApplications() {
    // ✅ Виправлено синтаксис relations
    const applications = await getRepository(application).find({
      relations: this.relations
    });
    return applications.map((app) => new applicationDto(app));
  }

  async getApplicationById(id: number) {
    if (isNaN(id)) {
      throw new CustomError(400, 'Validation', 'invalid ID application');
    }
    // ✅ Виправлено синтаксис relations
    const app = await getRepository(application).findOne({
      where: { id },
      relations: this.relations
    });

    if (!app) {
      throw new CustomError(404, 'General', 'application not found');
    }

    return new applicationDto(app);
  }

  async createApplication(data: Partial<application>) {
    const newApp = getRepository(application).create(data);
    const saved = await getRepository(application).save(newApp);

    // 🔥 ВАЖЛИВО: Перезавантажуємо створену заявку разом зі зв'язками
    const reloaded = await getRepository(application).findOne({
      where: { id: saved.id },
      relations: this.relations
    });

    if (!reloaded) {
        throw new CustomError(500, 'General', 'Error reloading created application');
    }

    return new applicationDto(reloaded);
  }

  async updateApplication(id: number, data: Partial<application>) {
    if (isNaN(id)) {
      throw new CustomError(400, 'Validation', 'invalid ID application');
    }

    const app = await getRepository(application).findOne({ where: { id } });
    if (!app) {
      throw new CustomError(404, 'General', 'application not found');
    }

    Object.assign(app, data);
    await getRepository(application).save(app);

    // 🔥 ВАЖЛИВО: Перезавантажуємо оновлену заявку разом зі зв'язками
    const reloaded = await getRepository(application).findOne({
      where: { id },
      relations: this.relations
    });

    if (!reloaded) {
        throw new CustomError(500, 'General', 'Error reloading updated application');
    }

    return new applicationDto(reloaded);
  }

  async deleteApplication(id: number) {
    if (isNaN(id)) {
      throw new CustomError(400, 'Validation', 'invalid ID application');
    }

    const result = await getRepository(application).delete(id);
    if (!result.affected) {
      throw new CustomError(404, 'General', 'application not found');
    }

    return { message: `application with ID ${id} correctly deleted` };
  }
}
