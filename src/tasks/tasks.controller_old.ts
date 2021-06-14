// import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
// import { CreateTaskDto } from './dto/create-task.dto';
// import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
// import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
// import { Task, TaskStatus } from './tasks.model';
// import { TasksService } from './tasks.service';


// // a principal função do controller é somente receber a notificação do service e devolver a resposta
// @Controller('tasks')
// export class TasksController {
//     constructor (private taskService: TasksService){}

//     @Get()
//     getTasks(@Query() filterDto: GetTasksFilterDto): Task[]{
//     // if we have any filters defined, call tasksService.getTasksWithFilters
//     // otherwise, just get all tasks
//         if(Object.keys(filterDto).length){
//             return this.taskService.getTaskWithFilters(filterDto);
//         }else {
//             return this.taskService.getAllTasks();
//         }     
//     }

//     // @Get()
//     // getAllTasks(): Task[]{
//     //     return this.taskService.getAllTasks();
//     // }

//     // @Post()
//     // // evitar de passar atributo errado, forçando o tipo no Body
//     // createTask(@Body('title') title: string, @Body('description') description: string){
//     //     return this.taskService.createTask(title, description);
//     // }

//     // Mesmo método, porem usando DTO
//     @Post()
//     createTask(@Body() createTaskDto: CreateTaskDto){
//         return this.taskService.createTask(createTaskDto);
//     }

//     @Get('/:id')
//     getTaskById(@Param('id') id: string): Task {
//         return this.taskService.getTaskById(id);
//     }

//     @Delete('/:id')
//     removeTaskById(@Param('id') id: string): void{
//         return this.taskService.removeTaskById(id);
//     }

//     @Patch('/:id/status')
//     updateTaskStatus(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto): Task{
//         const { status } = updateTaskStatusDto;
//         return this.taskService.updateTaskStatus(id, status);
//     }

//     @Patch('/:id/description')
//     updateTaskDescription(@Param('id') id: string, @Body('description') description: string): Task{
//         return this.taskService.updateTaskDescriptio(id, description);
//     }

// }
 