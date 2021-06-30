import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class tb_token{
    @PrimaryGeneratedColumn()
    id: string

    @Column({ length: 50 })
    token: string

    @Column({ length: 150 })
    email: string
}