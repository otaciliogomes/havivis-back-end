import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import ProdutoPedidoRepository from "../../repositories/ProdutoPedidoRepository";
import ProdutoRepository from "../../repositories/ProdutoRepository";
import PedidoController from "../Pedido/PedidosController"
import ProdutoController from "../Produto/ControllerProduto"

class ProdutoPedidoController {
    async create(request: Request, response: Response) {
        const pedidoProdutoRepository = getCustomRepository(ProdutoPedidoRepository);
        const pedidoController = new PedidoController();

        const { pedido_id, produto_id, valor } = request.body;

        if (!produto_id || !pedido_id || !valor) {
            throw new Error("ERROR: Falta argumentos");
        }


        const produtoPedido = pedidoProdutoRepository.create({ pedido_id, produto_id });
        await pedidoProdutoRepository.save(produtoPedido);
        await pedidoController.insertItem(pedido_id, valor)


        return response.status(201).json(produtoPedido)
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        if (!id) {
            throw new Error("ERROR: ID não informado");
        }

        const pedidoProdutoRepository = getCustomRepository(ProdutoPedidoRepository);
        const produtoRepository = getCustomRepository(ProdutoRepository);

        const listItems = await pedidoProdutoRepository.find({ where: { pedido_id: id } });

        let listProdutos = []
        await Promise.all(listItems.map(async (produto) => {
            const [item] = await produtoRepository.find({ id: produto.produto_id });
            listProdutos.push(item)
        }))


        return response.status(200).json(listProdutos)
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        if (!id) {
            throw new Error("Informe ID");
        }

        const pedidoProdutoRepository = getCustomRepository(ProdutoPedidoRepository);

        await pedidoProdutoRepository.delete({id});

        return response.status(200).json({ status: "Item excluido"})
    }
}

export default ProdutoPedidoController;
