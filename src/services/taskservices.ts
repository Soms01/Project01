import { getRepository } from 'typeorm';
import { task } from '../orm/entities/task';
import { tasksDto } from '../DTO/tasksDto'
import { CustomError } from '../utils/response/custom-error/CustomError';

export class taskservices {
    private taskRepository = getRepository(task);

    async getAllTasks() {
    const tasks = await this.taskRepository.find();
    return tasks.map((ts) => new tasksDto(ts));
    }

    async getTaskById(id: number) {
    if (isNaN(id)) {
      throw new CustomError(400, 'Validation', 'invalid ID task');
    }
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new CustomError(404, 'General', 'task not found');
    }

    return new tasksDto(task);
    }

    async createTask(data: Partial<task>){
        const task = this.taskRepository.create(data);
        const created = await this.taskRepository.save(task);
        return new tasksDto(created);

    }

    async updateTask(id: number, data: Partial<task>) {
    if (isNaN(id)) {
      throw new CustomError(400, 'Validation', 'invalid ID task');
    }
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new CustomError(404, 'General', 'task not found ');
    }

    Object.assign(task, data);
    const updated = await this.taskRepository.save(task);
    return new tasksDto(updated);
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