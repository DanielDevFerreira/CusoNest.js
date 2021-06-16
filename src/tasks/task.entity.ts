import { Exclude } from "class-transformer";
import { User } from "src/auth/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @ManyToOne((_type) => User, (user) => user.tasks, {eager: false } )
    @Exclude({ toPlainOnly: true })
    user: User;
}