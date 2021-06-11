import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';


// a principal função do controller é somente receber a notificação do service e devolver a resposta
@Controller('tasks')
export class TasksController {
    constructor (private taskService: TasksService){}

    @Get()
    getAllTasks(): Task[]{
        return this.taskService.getAllTasks();
    }

    @Post()
    createTask(
        // evitar de passar atributo errado, forçando o tipo no Body
        @Body('title') title: string,
        @Body('description') description: string
    ){
        console.log('title', title);
        console.log('description', description);
    }
}
 