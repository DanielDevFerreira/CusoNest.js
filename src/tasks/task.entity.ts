import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatusBase } from "./task-status.enum";

@Entity()
export class TaskEntity{
    @PrimaryGeneratedColumn()
    id: string

    @Column({ length: 50 })
    title: string

    @Column({ length: 150 })
    description: string

    @Column({ length: 20 })
    status: TaskStatusBase
}