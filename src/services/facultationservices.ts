import { getRepository } from 'typeorm';
import { facultation } from '../orm/entities/facultation';
import { facultationDto } from '../DTO/facultationDto'
import { CustomError } from '../utils/response/custom-error/CustomError';

export class facultationservices {
    async getAllFacultations() {
      const facultations = await getRepository(facultation).find();
      return facultations.map((fac) => new facultationDto(fac));
    }

    async getFacultationById(id: number) {
    if (isNaN(id)) {
      throw new CustomError(400, 'Validation', 'invalid ID facultation');
    }
    const facultationEntity = await getRepository(facultation).findOne({ where: { id } });
    if (!facultationEntity) {
      throw new CustomError(404, 'General', 'facultation not found');
    }

    return new facultationDto(facultationEntity);
    }

    async createFacultation(data: Partial<facultation>){
        const facultationEntity = getRepository(facultation).create(data);
        const created = await getRepository(facultation).save(facultationEntity);
        return new facultationDto(created);

    }

    async updateFacultation(id: number, data: Partial<facultation>) {
    if (isNaN(id)) {
      throw new CustomError(400, 'Validation', 'invalid ID facultation');
    }
    const facultationEntity = await getRepository(facultation).findOne({ where: { id } });
    if (!facultationEntity) {
      throw new CustomError(404, 'General', 'facultation not found ');
    }

    Object.assign(facultationEntity, data);
    const updated = await getRepository(facultation).save(facultationEntity);
    return new facultationDto(updated);
  }

  async deleteFacultation(id: number) {
    if (isNaN(id)) {
      throw new CustomError(400, 'Validation', 'invalid ID facultation');
    }

    const result = await getRepository(facultation).delete(id);
    if (!result.affected) {
      throw new CustomError(404, 'General', 'facultation not found');
    }

    return { message: `facultation with ID ${id} correctly deleted` };
  }
}
