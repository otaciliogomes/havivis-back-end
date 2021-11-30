import { Entity, PrimaryColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Pedido } from "./Pedido";
import { Produto } from "./Produto";


@Entity("produto_pedido")
export class Produto_Pedido {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    pedido_id: string;

    @JoinColumn({ name: "pedido_id" })
    @ManyToOne(() => Pedido)
    pedidoId: Pedido;

    @Column()
    produto_id: string;

    @JoinColumn({ name: "produto_id" })
    @ManyToOne(() => Produto)
    produtoId: Produto;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}
