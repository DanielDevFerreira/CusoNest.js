import { InternalServerErrorException, Logger } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskStatusBase } from "./task-status.enum";
import { TaskEntity } from "./task.entity";

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity>{
    private logger = new Logger('TaskRepository', true);

    async getTaskAll(filterDto: GetTasksFilterDto, user: User): Promise<TaskEntity[]>{
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');
        query.where({ user });

        if(status){
            query.andWhere('task.status = :status', {status});
        }

        if(search){
            query.andWhere('(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))', { search: `%${search}%`});
        }

        try {
            const tasks = await query.getMany();
            return tasks;
        } catch (error) {
            this.logger.error(`Failed to get tasks for user ${user.username}. Filters: ${JSON.stringify(filterDto)}, error.stack`)
            throw new InternalServerErrorException();
        }
        
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<TaskEntity>{
        const { title, description } = createTaskDto;
 
        const task = this.create({
            title,
            description,
            status: TaskStatusBase.OPEN,
            user
        });
 
        await this.save(task);
        return task;
    }
}