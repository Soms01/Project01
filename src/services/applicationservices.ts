import { getRepository } from 'typeorm';
import { application } from '../orm/entities/Aplication';
import { applicationDto } from '../DTO/applicationDto';
import { CustomError } from '../utils/response/custom-error/CustomError';

export class applicationservices {
  private appRepository = getRepository(application);

  private relations = [
    'student',           
        'student.specialition',
        'student.specialition.facultation',    
        'practicePlace',          
        'practicePlace.city',      
        'universityManager',
        'universityManager.facultation',      
        'practicePlaceManager',
        'practicePlaceManager.practicePlace',
        'practicePlaceManager.practicePlace.city'    
  ];

  async getAllApplications() {
    const applications = await this.appRepository.find({
      relations: this.relations 
    });
    return applications.map((app) => new applicationDto(app));
  }

  async getApplicationById(id: number) {
    if (isNaN(id)) {
      throw new CustomError(400, 'Validation', 'invalid ID application');
    }
    const app = await this.appRepository.findOne({ 
      where: { id },
      relations: this.relations 
    });

    if (!app) {
      throw new CustomError(404, 'General', 'application not found');
    }

    return new applicationDto(app);
  }

  async createApplication(data: Partial<application>) {
    const newApp = this.appRepository.create(data);
    const saved = await this.appRepository.save(newApp);

    const reloaded = await this.appRepository.findOne({
      where: { id: saved.id },
      relations: this.relations
    });

    if (!reloaded) throw new CustomError(500, 'General', 'Error reloading created application');

    return new applicationDto(reloaded);
  }

  async updateApplication(id: number, data: Partial<application>) {
    if (isNaN(id)) {
      throw new CustomError(400, 'Validation', 'invalid ID application');
    }
    
    const app = await this.appRepository.findOne({ where: { id } });
    if (!app) {
      throw new CustomError(404, 'General', 'application not found');
    }

    Object.assign(app, data);
    await this.appRepository.save(app);

    const reloaded = await this.appRepository.findOne({
      where: { id },
      relations: this.relations
    });

    if (!reloaded) throw new CustomError(500, 'General', 'Error reloading updated application');

    return new applicationDto(reloaded);
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