import { getRepository } from 'typeorm';
import { task } from '../orm/entities/task';
import { tasksDto } from '../DTO/tasksDto';
import { CustomError } from '../utils/response/custom-error/CustomError';

export class TaskServices { // PascalCase для класів

    private taskRepository = getRepository(task);

    // 👇 ВАЖЛИВО: Відкрий 'orm/entities/task.ts' і подивись, 
    // з ким зв'язана таблиця tasks. Зазвичай це 'student' та 'practice_place_manager'.
    // Впишіть сюди точні назви полів з декоратором @ManyToOne.
    private relations = ['student', 'practice_place_manager']; 

    async getAllTasks() {
        const tasks = await this.taskRepository.find({
            relations: this.relations // ✅ Завантажуємо зв'язки
        });
        return tasks.map((ts) => new tasksDto(ts));
    }

    async getTaskById(id: number) {
        if (isNaN(id)) {
            throw new CustomError(400, 'Validation', 'invalid ID task');
        }
        const task = await this.taskRepository.findOne({ 
            where: { id },
            relations: this.relations // ✅ Завантажуємо зв'язки
        });

        if (!task) {
            throw new CustomError(404, 'General', 'task not found');
        }

        return new tasksDto(task);
    }

    async createTask(data: Partial<task>){
        const newTask = this.taskRepository.create(data);
        const created = await this.taskRepository.save(newTask);

        // 🔥 ПЕРЕЗАВАНТАЖЕННЯ:
        // Щоб DTO не впав при спробі прочитати created.student.name
        const reloaded = await this.taskRepository.findOne({
            where: { id: created.id },
            relations: this.relations
        });

        if (!reloaded) throw new CustomError(500, 'General', 'Error reloading created task');

        return new tasksDto(reloaded);
    }

    async updateTask(id: number, data: Partial<task>) {
        if (isNaN(id)) {
            throw new CustomError(400, 'Validation', 'invalid ID task');
        }
        
        const existingTask = await this.taskRepository.findOne({ where: { id } });
        if (!existingTask) {
            throw new CustomError(404, 'General', 'task not found ');
        }

        Object.assign(existingTask, data);
        await this.taskRepository.save(existingTask);

        // 🔥 ПЕРЕЗАВАНТАЖЕННЯ:
        const reloaded = await this.taskRepository.findOne({
            where: { id },
            relations: this.relations
        });

        if (!reloaded) throw new CustomError(500, 'General', 'Error reloading updated task');

        return new tasksDto(reloaded);
    }

    async deleteTask(id: number) {
        if (isNaN(id)) {
            throw new CustomError(400, 'Validation', 'invalid ID task');
        }

        const result = await this.taskRepository.delete(id);
        if (!result.affected) {
            throw new CustomError(404, 'General', 'task not found');
        }

        return { message: `task with ID ${id} correctly deleted` };
    }
}