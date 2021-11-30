import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Cliente } from "./Cliente";
import { Funcionario } from "./Funcionario";

@Entity("pedido")
export class Pedido {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    status: string;

    @Column()
    forma_de_pagamento: string;

    @Column()
    obeservacao: string;

    @Column()
    cliente_id: string;

    @JoinColumn({ name: "cliente_id" })
    @ManyToOne(() => Cliente)
    cliented: Cliente;

    @Column()
    funcionario_id: string;

    @JoinColumn({ name: "funcionario_id" })
    @ManyToOne(() => Funcionario)
    funcionarioId: Funcionario;

    @Column()
    valor: number;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}
