import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Pedido1635903190448 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "pedido",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "forma_de_pagamento",
                        type: "varchar",
                        default: null
                    },
                    {
                        name: "obeservacao",
                        type: "varchar",
                        default: null
                    },
                    {
                        name: "status",
                        type: "varchar"
                    },
                    {
                        name: "cliente_id",
                        type: "varchar",
                        default: null
                    },
                    {
                        name: "funcionario_id",
                        type: "varchar",
                        default: null
                    },
                    {
                        name: "valor",
                        type: "int",
                        default: null
                    }

                ],
                foreignKeys: [
                    {
                        name: "FKClientePedido",
                        referencedTableName: "cliente",
                        referencedColumnNames: ["id"],
                        columnNames:["cliente_id"],
                        onDelete: "CASCADE"
                    },
                    {
                        name: "FKFuncionarioPedido",
                        referencedTableName: "funcionario",
                        referencedColumnNames: ["id"],
                        columnNames: ["funcionario_id"],
                        onDelete: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("pedido")
    }

}
