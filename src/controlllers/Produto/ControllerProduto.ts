import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import ProdutoRepository from "../../repositories/ProdutoRepository";

class ProdutoController {
    async create(request: Request, response: Response) {
        const { descricao, imagem, nome, valor } = request.body;

        if (!descricao || !imagem || !nome || !valor) {
            throw new Error("ERROR: Falta argumentos");
        }

        const produtoRepository = getCustomRepository(ProdutoRepository);

        const produto = produtoRepository.create({
            descricao,
            imagem,
            nome,
            valor
        });

        await produtoRepository.save(produto);

        return response.status(201).json(produto);

    }

    async show(request: Request, response: Response) {
        const produtoRepository = getCustomRepository(ProdutoRepository);

        const listProdutos = await produtoRepository.find()

        return response.status(200).json(listProdutos)
    }

    async index(request: Request, response: Response) {
        const { id } = request.params;
        const produtoRepository = getCustomRepository(ProdutoRepository);

        const produto = await produtoRepository.findOne(id);

        return response.status(200).json(produto);
    }

    async update(request: Request, response: Response) {
        const { id, descricao, imagem, nome, valor } = request.body;

        if (!descricao || !imagem || !nome || !valor) {
            throw new Error("ERROR: Falta argumentos");
        }

        const produtoRepository = getCustomRepository(ProdutoRepository);

        const produto = await produtoRepository.update({ id }, { descricao, imagem, nome, valor });

        return response.status(202).json(produto)
    }

    async delete(request: Request, response: Response) {
        const { id } = request.body;

        if (!id) {
            throw new Error("ID não informado")
        }
        const produtoRepository = getCustomRepository(ProdutoRepository);

        await produtoRepository.delete({ id });

        return response.status(200).json({status: "Produto Excluido" });
    }
}

export default ProdutoController;
