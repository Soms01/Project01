import { getRepository } from 'typeorm';
import { student } from '../orm/entities/student';
import { studentDto } from '../DTO/studentDto';
import { CustomError } from '../utils/response/custom-error/CustomError';

export class studentservices { // Краще назвати StudentServices
    private studentRepository = getRepository(student);

    // 👇 ВАЖЛИВО: Перевір у файлі 'orm/entities/student.ts', 
    // як саме називається поле зв'язку зі спеціальністю.
    // Я написав 'specialition', бо так називався твій entity-файл раніше.
    // Якщо там написано @ManyToOne... specialization, то зміни тут на 'specialization'
    private relations = ['specialition']; 

    async getAllStudents() {
        const students = await this.studentRepository.find({
            relations: this.relations // ✅ Завантажуємо спеціальність разом зі студентами
        });
        return students.map((st) => new studentDto(st));
    }

    async getStudentById(id: number) {
        if (isNaN(id)) {
            throw new CustomError(400, 'Validation', 'invalid ID student');
        }
        const student = await this.studentRepository.findOne({ 
            where: { id },
            relations: this.relations // ✅ Завантажуємо спеціальність
        });

        if (!student) {
            throw new CustomError(404, 'General', 'student not found');
        }

        return new studentDto(student);
    }

    async createStudent(data: Partial<student>){
        const student = this.studentRepository.create(data);
        const created = await this.studentRepository.save(student);

        // 🔥 ПЕРЕЗАВАНТАЖЕННЯ:
        // Після save() ми маємо тільки ID спеціальності, але не її назву.
        // Треба перезавантажити студента з бази разом зі зв'язками.
        const reloaded = await this.studentRepository.findOne({
            where: { id: created.id },
            relations: this.relations
        });

        if (!reloaded) throw new CustomError(500, 'General', 'Error reloading created student');

        return new studentDto(reloaded);
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
        await this.studentRepository.save(student);

        // 🔥 ПЕРЕЗАВАНТАЖЕННЯ:
        const reloaded = await this.studentRepository.findOne({
            where: { id },
            relations: this.relations
        });

        if (!reloaded) throw new CustomError(500, 'General', 'Error reloading updated student');

        return new studentDto(reloaded);
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