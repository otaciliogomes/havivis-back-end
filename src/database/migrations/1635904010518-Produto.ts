import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Produto1635904010518 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "produto",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true
                    },
                    {
                        name: "descricao",
                        type: "varchar"
                    },
                    {
                        name: "imagem",
                        type: "varchar"
                    },
                    {
                        name: "nome",
                        type: "varchar"
                    },
                    {
                        name: "valor",
                        type: "float"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("produto");
    }

}
