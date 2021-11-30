import {Entity, PrimaryColumn, Column} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("produto")
export class Produto {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    nome: string;

    @Column()
    descricao: string;

    @Column()
    imagem: string;

    @Column()
    valor: number;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}
