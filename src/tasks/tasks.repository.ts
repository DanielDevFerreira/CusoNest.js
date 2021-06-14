import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskStatusBase } from "./task-status.enum";
import { TaskEntity } from "./task.entity";

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity>{

    async getTaskAll(filterDto: GetTasksFilterDto): Promise<TaskEntity[]>{
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');

        if(status){
            query.andWhere('task.status = :status', {status: 'OPEN'});
        }

        if(search){

        }

        const tasks = await query.getMany();
        return tasks;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity>{
        const { title, description } = createTaskDto;
 
        const task = this.create({
            title,
            description,
            status: TaskStatusBase.OPEN,
        });
 
        await this.save(task);
        return task;
    }
}