import { getRepository } from 'typeorm';
import { city } from '../orm/entities/city';
import { cityDto } from '../DTO/cityDto'
import { CustomError } from '../utils/response/custom-error/CustomError';

export class cityservices {
    private cityRepository = getRepository(city);

    async getAllCities() {
    const cities = await this.cityRepository.find();
    return cities.map((c) => new cityDto(c));
    }

    async getCityById(id: number) {
    if (isNaN(id)) {
      throw new CustomError(400, 'Validation', 'invalid ID city');
    }
    const city = await this.cityRepository.findOne({ where: { id } });
    if (!city) {
      throw new CustomError(404, 'General', 'city not found');
    }

    return new cityDto(city);
    }

    async createCity(data: Partial<city>){
        const city = this.cityRepository.create(data);
        const created = await this.cityRepository.save(city);
        return new cityDto(created);

    }

    async updateCity(id: number, data: Partial<city>) {
    if (isNaN(id)) {
      throw new CustomError(400, 'Validation', 'invalid ID city');
    }
    const city = await this.cityRepository.findOne({ where: { id } });
    if (!city) {
      throw new CustomError(404, 'General', 'city not found ');
    }

    Object.assign(city, data);
    const updated = await this.cityRepository.save(city);
    return new cityDto(updated);
  }

  async deleteCity(id: number) {
    if (isNaN(id)) {
      throw new CustomError(400, 'Validation', 'invalid ID city');
    }

    const result = await this.cityRepository.delete(id);
    if (!result.affected) {
      throw new CustomError(404, 'General', 'city not found');
    }

    return { message: `city with ID ${id} correctly deleted` };
  }
}