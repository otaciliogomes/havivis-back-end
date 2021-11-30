import {Entity, PrimaryColumn, Column} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("funcionario")
export class Funcionario {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    user: string;

    @Column()
    senha: string;

    @Column()
    tipo: boolean;

    @Column()
    token: string;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}
