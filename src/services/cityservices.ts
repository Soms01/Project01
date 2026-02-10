import { getRepository } from 'typeorm';
import { city } from '../orm/entities/city';
import { cityDto } from '../DTO/cityDto'
import { CustomError } from '../utils/response/custom-error/CustomError';

export class cityservices {
    async getAllCities() {
    const cities = await getRepository(city).find();
    return cities.map((c) => new cityDto(c));
    }

    async getCityById(id: number) {
    if (isNaN(id)) {
      throw new CustomError(400, 'Validation', 'invalid ID city');
    }
    const cityEntity = await getRepository(city).findOne({ where: { id } });
    if (!cityEntity) {
      throw new CustomError(404, 'General', 'city not found');
    }

    return new cityDto(cityEntity);
    }

    async createCity(data: Partial<city>){
        const cityEntity = getRepository(city).create(data);
        const created = await getRepository(city).save(cityEntity);
        return new cityDto(created);

    }

    async updateCity(id: number, data: Partial<city>) {
    if (isNaN(id)) {
      throw new CustomError(400, 'Validation', 'invalid ID city');
    }
    const cityEntity = await getRepository(city).findOne({ where: { id } });
    if (!cityEntity) {
      throw new CustomError(404, 'General', 'city not found ');
    }

    Object.assign(cityEntity, data);
    const updated = await getRepository(city).save(cityEntity);
    return new cityDto(updated);
  }

  async deleteCity(id: number) {
    if (isNaN(id)) {
      throw new CustomError(400, 'Validation', 'invalid ID city');
    }

    const result = await getRepository(city).delete(id);
    if (!result.affected) {
      throw new CustomError(404, 'General', 'city not found');
    }

    return { message: `city with ID ${id} correctly deleted` };
  }
}
