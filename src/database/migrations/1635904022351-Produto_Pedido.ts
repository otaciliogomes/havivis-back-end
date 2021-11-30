import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class ProdutoPedido1635904022351 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "produto_pedido",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true
                    },
                    {
                        name: "pedido_id",
                        type: "varchar"
                    },
                    {
                        name: "produto_id",
                        type: "varchar"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKPedido",
                        referencedTableName: "pedido",
                        referencedColumnNames: ["id"],
                        columnNames: ["pedido_id"],
                        onDelete: "CASCADE"
                    },
                    {
                        name: "FKPruduto",
                        referencedTableName: "produto",
                        referencedColumnNames: ["id"],
                        columnNames: ["produto_id"],
                        onDelete: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("produto_pedido")
    }

}
