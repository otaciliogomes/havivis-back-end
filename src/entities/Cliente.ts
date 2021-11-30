import {Entity, PrimaryColumn, Column} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("cliente")
export class Cliente {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    nome: string;

    @Column()
    endereco: string;

    @Column()
    telefone: number;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}
