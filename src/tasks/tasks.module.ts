import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TasksController } from './tasks.controller';
import { TaskRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

@Module({
    // permite depender, injetar ou injetar a dependência
    imports:[TypeOrmModule.forFeature([TaskRepository]), AuthModule],
    controllers:[TasksController],
    providers:[TasksService]
})
export class TasksModule {}
