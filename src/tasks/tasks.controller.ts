import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
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
    constructor (private taskService: TasksService){}

    @Get()
    getAllTasks(@Query() filterDto: GetTasksFilterDto, @GetUser() user: User): Promise<TaskEntity[]>{
        return this.taskService.getAllTasks(filterDto, user);
    }

    @Get('/:id')
    getTaskById(@Param('id') id:string): Promise<TaskEntity> {
        return this.taskService.getTaskById(id);
    }

    // Mesmo método, porem usando DTO
    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User ): Promise<TaskEntity>{
        return this.taskService.createTask(createTaskDto, user);
    }

    @Delete('/:id')
    removeTaskById(@Param('id') id: string): Promise<void>{
        return this.taskService.removeTaskById(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto): Promise<TaskEntity>{
        const { status } = updateTaskStatusDto;
        return this.taskService.updateTaskStatus(id, status);
    }
}
 