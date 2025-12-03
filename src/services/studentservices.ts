import { getRepository } from 'typeorm';
import { student } from '../orm/entities/student';
import { studentDto } from '../DTO/studentDto'
import { CustomError } from '../utils/response/custom-error/CustomError';

export class studentservices {
    private studentRepository = getRepository(student);

    async getAllStudents() {
    const students = await this.studentRepository.find();
    return students.map((st) => new studentDto(st));
    }

    async getStudentById(id: number) {
    if (isNaN(id)) {
      throw new CustomError(400, 'Validation', 'invalid ID student');
    }
    const student = await this.studentRepository.findOne({ where: { id } });
    if (!student) {
      throw new CustomError(404, 'General', 'student not found');
    }

    return new studentDto(student);
    }

    async createStudent(data: Partial<student>){
        const student = this.studentRepository.create(data);
        const created = await this.studentRepository.save(student);
        return new studentDto(created);

    }

    async updateStudent(id: number, data: Partial<student>) {
    if (isNaN(id)) {
      throw new CustomError(400, 'Validation', 'invalid ID student');
    }
    const student = await this.studentRepository.findOne({ where: { id } });
    if (!student) {
      throw new CustomError(404, 'General', 'student not found ');
    }

    Object.assign(student, data);
    const updated = await this.studentRepository.save(student);
    return new studentDto(updated);
  }

  async deleteStudent(id: number) {
    if (isNaN(id)) {
      throw new CustomError(400, 'Validation', 'invalid ID student');
    }

    const result = await this.studentRepository.delete(id);
    if (!result.affected) {
      throw new CustomError(404, 'General', 'student not found');
    }

    return { message: `student with ID ${id} correctly deleted` };
  }
}