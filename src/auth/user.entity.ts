
import { TaskEntity } from "src/tasks/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ length: 50, unique: true })
    username: string;

    @Column({ length: 60, unique: true })
    email: string;

    @Column({ length: 100 })
    password: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    dt_create: string;

    @OneToMany((_type) => TaskEntity, task => task.user)
    tasks: TaskEntity[];
}