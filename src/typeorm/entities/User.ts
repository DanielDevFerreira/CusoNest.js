import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class tb_usuario_login {
    @PrimaryGeneratedColumn()
    id_usuario_login: number;

    @Column('bigint')
    id_usuario: number;

    @Column('tinyint')
    id_status: number;

    @Column('tinyint')
    id_tipo_login: number;

    @Column({ length: 20 })
    login: string;

    @Column({ length: 32 })
    password: string;

    @Column({ length: 100 })
    nome: string;
    
    @Column({ length: 100 })
    email: string;

    @Column({ length: 500})
    observacao: string;

    @Column('bigint')
    id_login_insert: number;

    @Column('datetime')
    dt_insert: Date;

    @Column('bigint')
    id_login_update: number;

    @Column('datetime')
    dt_update: Date;
}
