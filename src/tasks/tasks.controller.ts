import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/GetUser_Decoretor/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskEntity } from './task.entity';
import { TasksService } from './tasks.service';


// a principal função do controller é somente receber a notificação do service e devolver a resposta
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger('TasksController');
    constructor (private taskService: TasksService){}

    @Get()
    getAllTasks(@Query() filterDto: GetTasksFilterDto, @GetUser() user: User): Promise<TaskEntity[]>{
        this.logger.verbose(`User ${user.username} retrieving all tasks. Filters: ${JSON.stringify(filterDto)}`);
        return this.taskService.getAllTasks(filterDto, user);
    }

    @Get('/:id')
    getTaskById(@Param('id') id:string, @GetUser() user: User): Promise<TaskEntity> {
        return this.taskService.getTaskById(id, user);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User ): Promise<TaskEntity>{
        this.logger.verbose(`User ${user.username} creating a new task. Data: ${JSON.stringify(createTaskDto)}`);
        return this.taskService.createTask(createTaskDto, user);
    }

    @Delete('/:id')
    removeTaskById(@Param('id') id: string, @GetUser() user: User): Promise<void>{
        return this.taskService.removeTaskById(id, user);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto, @GetUser() user: User): Promise<TaskEntity>{
        const { status } = updateTaskStatusDto;
        return this.taskService.updateTaskStatus(id, status, user);
    }
}
 