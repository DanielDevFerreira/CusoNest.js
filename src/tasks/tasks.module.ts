import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TaskRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

@Module({
    // permite depender, injetar ou injetar a dependência
    imports:[TypeOrmModule.forFeature([TaskRepository])],
    controllers:[TasksController],
    providers:[TasksService]
})
export class TasksModule {}
