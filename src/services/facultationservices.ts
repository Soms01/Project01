import { getRepository } from 'typeorm';
import { facultation } from '../orm/entities/facultation';
import { facultationDto } from '../DTO/facultationDto'
import { CustomError } from '../utils/response/custom-error/CustomError';

export class facultationservices {
    private facRepository = getRepository(facultation);

    async getAllFacultations() {
    const facultations = await this.facRepository.find();
    return facultations.map((fac) => new facultationDto(fac));
    }

    async getFacultationById(id: number) {
    if (isNaN(id)) {
      throw new CustomError(400, 'Validation', 'invalid ID facultation');
    }
    const facultation = await this.facRepository.findOne({ where: { id } });
    if (!facultation) {
      throw new CustomError(404, 'General', 'facultation not found');
    }

    return new facultationDto(facultation);
    }

    async createFacultation(data: Partial<facultation>){
        const facultation = this.facRepository.create(data);
        const created = await this.facRepository.save(facultation);
        return new facultationDto(created);

    }

    async updateFacultation(id: number, data: Partial<facultation>) {
    if (isNaN(id)) {
      throw new CustomError(400, 'Validation', 'invalid ID facultation');
    }
    const facultation = await this.facRepository.findOne({ where: { id } });
    if (!facultation) {
      throw new CustomError(404, 'General', 'facultation not found ');
    }

    Object.assign(facultation, data);
    const updated = await this.facRepository.save(facultation);
    return new facultationDto(updated);
  }

  async deleteFacultation(id: number) {
    if (isNaN(id)) {
      throw new CustomError(400, 'Validation', 'invalid ID facultation');
    }

    const result = await this.facRepository.delete(id);
    if (!result.affected) {
      throw new CustomError(404, 'General', 'facultation not found');
    }

    return { message: `facultation with ID ${id} correctly deleted` };
  }
}