import { getRepository } from 'typeorm';
import { application } from '../orm/entities/Aplication';
import { applicationDto } from '../DTO/applicationDto'
import { CustomError } from '../utils/response/custom-error/CustomError';

export class applicationservices {
    private appRepository = getRepository(application);

    async getAllApplications() {
    const applications = await this.appRepository.find();
    return applications.map((app) => new applicationDto(app));
    }

    async getApplicationById(id: number) {
    if (isNaN(id)) {
      throw new CustomError(400, 'Validation', 'invalid ID application');
    }
    const application = await this.appRepository.findOne({ where: { id } });
    if (!application) {
      throw new CustomError(404, 'General', 'application not found');
    }

    return new applicationDto(application);
    }

    async createApplication(data: Partial<application>){
        const application = this.appRepository.create(data);
        const created = await this.appRepository.save(application);
        return new applicationDto(created);

    }

    async updateApplication(id: number, data: Partial<application>) {
    if (isNaN(id)) {
      throw new CustomError(400, 'Validation', 'invalid ID application');
    }
    const application = await this.appRepository.findOne({ where: { id } });
    if (!application) {
      throw new CustomError(404, 'General', 'application not found ');
    }

    Object.assign(application, data);
    const updated = await this.appRepository.save(application);
    return new applicationDto(updated);
  }

  async deleteApplication(id: number) {
    if (isNaN(id)) {
      throw new CustomError(400, 'Validation', 'invalid ID application');
    }

    const result = await this.appRepository.delete(id);
    if (!result.affected) {
      throw new CustomError(404, 'General', 'application not found');
    }

    return { message: `application with ID ${id} correctly deleted` };
  }
}