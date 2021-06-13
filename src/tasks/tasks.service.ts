import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[]{
        return this.tasks;
    }

    getTaskWithFilters(filterDto: GetTasksFilterDto){
        const { status, search } = filterDto;

        // define a temporary array to hold the result
        let tasks = this.getAllTasks();
        // do something with status
        if(status){
            tasks = tasks.filter((task) => task.status === status);
        }
        // do something with search
        if(search){
            tasks = tasks.filter((task) => {
                if(task.title.toLowerCase().includes(search) || task.description.toLowerCase().includes(search)){
                    return true;
                }else {
                    return false;
                }
            })
        }
        // return final result
        return tasks;
    }

    // createTask(title: string, description: string): Task{
    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN
    //     };

    //     this.tasks.push(task);
    //     return task;
    // }

    // o mesmo método, usando DTO
    createTask(createTaskDto: CreateTaskDto): Task{
        const {title, description } = createTaskDto;

        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);
        return task;
    }

    getTaskById(id: string): Task{
        return this.tasks.find((task) => task.id === id)
    }

    removeTaskById(id: string): void{
        this.tasks = this.tasks.filter((task) => task.id !== id);
    }

    updateTaskStatus(id: string, status: TaskStatus){
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }

    updateTaskDescriptio(id: string, description: string){
        const task = this.getTaskById(id);
        task.description = description;
        return task;
    }
}
