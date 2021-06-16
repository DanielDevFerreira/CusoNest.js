/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './tasks.repository';
import { TaskEntity } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusBase } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
   constructor(
       private taskRepository: TaskRepository,
   ){}

   // Pegando todos os registros do BD
    async getAllTasks(filterDto: GetTasksFilterDto, user: User): Promise<TaskEntity[]>{
        return this.taskRepository.getTaskAll(filterDto, user);
    }
    
    // Pegando apenas um registro pelo id do BD
   async getTaskById(id:string): Promise<TaskEntity>{
       const found = await this.taskRepository.findOne(id);

       if(!found){
           throw new NotFoundException(`Task with ID ${id} not found`);
       }

       return found;
   }

   // Criando um novo registro no BD
   createTask(createTaskDto: CreateTaskDto, user: User): Promise<TaskEntity>{
       return this.taskRepository.createTask(createTaskDto, user);
   }

   // Removendo um registro no BD
   async removeTaskById(id: string): Promise<void>{
        const result = await this.taskRepository.delete(id);

        if(result.affected === 0){
            throw new NotFoundException(`Task with ID ${id} not found`);
        }  
    }

    // Atualizando um registro no BD
    async updateTaskStatus(id: string, status: TaskStatusBase): Promise<TaskEntity>{
        const task = await this.getTaskById(id);
        
        task.status = status;
        await this.taskRepository.save(task);

        return task;
    }
}
