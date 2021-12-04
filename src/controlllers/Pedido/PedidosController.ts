import { Request, response, Response } from "express";
import { getCustomRepository } from "typeorm";
import PedidoRepository from "../../repositories/PedidoRepository";
import ClienteRepository from "../../repositories/ClienteRepository";
import FuncionarioRepository from "../../repositories/FuncionarioRepository";
import dayjs from "dayjs";


class PedidoController {
    async create(request: Request, response: Response) {
        const { funcionario_id } = request.body;
        const status = "Aberto";

        if (!status) {
            throw new Error("ERROR: Status não informado");
        }

        const pedidoRepository = getCustomRepository(PedidoRepository);

        const dayNow = new Date();
        const year = dayNow.getFullYear()
        const getMonth = dayNow.getMonth();
        const day = dayNow.getDate();
        const newDate = `${day}/${getMonth + 1}/${year}`;

        const pedido = pedidoRepository.create({
            forma_de_pagamento: "",
            obeservacao: "",
            valor: 0,
            status,
            funcionario_id
        })

        console.log(pedido)
        await pedidoRepository.save(pedido);

        return response.status(201).json(pedido)
    }

    async showOne(request: Request, response: Response) {
        const { id } = request.params;
        if (!id) {
            throw new Error("Id não informado");
        }

        const pedidoRepository = getCustomRepository(PedidoRepository);

        const listaDePedidos = await pedidoRepository.findOne({ id })

        return response.status(200).json(listaDePedidos);
    }

    async show(request: Request, response: Response) {
        const pedidoRepository = getCustomRepository(PedidoRepository);
        const clienteRepository = getCustomRepository(ClienteRepository);
        const funcionarioRepository = getCustomRepository(FuncionarioRepository);

        const listaDePedidos = await pedidoRepository.find();

        let listPedidos = []
        await Promise.all(listaDePedidos.map(async (pedido) => {
            const [cliente] = await clienteRepository.find({ id: pedido.cliente_id });
            const [item] = await funcionarioRepository.find({ id: pedido.funcionario_id });
            const result = {
                ...pedido,
                cliente_id: cliente,
                funcionario_id: item
            }

            listPedidos.push(result);
        }));


        return response.status(200).json(listPedidos);
    }

    async updateStatus(id: string, status: string, valueItem: number) {
        const pedidoRepository = getCustomRepository(PedidoRepository);

        const response = await pedidoRepository.findOne(id)

        const pedidoUpdated = await pedidoRepository.update({ id }, { status, valor: valueItem + response.valor });

        return pedidoUpdated;
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        if (!id) {
            throw new Error("Id não informado");
        }

        const pedidoRepository = getCustomRepository(PedidoRepository);

        await pedidoRepository.delete({ id });

        return response.status(204).json({message: "Pedido Excluido!"});

    }

    async closePedido(request: Request, response: Response) {
        const { id } = request.body
        const pedidoRepository = getCustomRepository(PedidoRepository);

        await pedidoRepository.update({ id }, { status: "Fechado" });

        return response.status(200).json({ status: "Pedido fechado com sucesso!" })

    }

    async insertFuncionario(id: string, funcionario_id: string) {
        const pedidoRepository = getCustomRepository(PedidoRepository);

        const pedidoUpdated = await pedidoRepository.update({ id }, { funcionario_id });

        return pedidoUpdated;
    }

    async getTotalPediso(request: Request, response: Response) {
        const pedidoRepository = getCustomRepository(PedidoRepository);

        const result = pedidoRepository.find({ where: { status: "Fechado" } });

        let total = 0;

        (await result).forEach(pedido => {
            total = total + pedido.valor
        })

        return response.status(200).json(total)
    }

    async addClientePedido(request: Request, response: Response) {
        const pedidoRepository = getCustomRepository(PedidoRepository);
        const clienteRepository = getCustomRepository(ClienteRepository)
        const { cliente, pedido_id } = request.body;

        const { nome, endereco, telefone } = cliente;

        const clienteCreated = clienteRepository.create({
            nome,
            endereco,
            telefone
        });


        await clienteRepository.save(clienteCreated);

        await pedidoRepository.update({ id: pedido_id }, { cliente_id: clienteCreated.id });

        return response.status(201).json(clienteCreated)
    }

    async pedidosFechadosHoje(request: Request, response: Response) {
        const pedidoRepository = getCustomRepository(PedidoRepository);
        const pedidos = await pedidoRepository.find({ status: "Fechado" });

        const todayOrders = new Date().toLocaleDateString();

        const pedidosFechado = pedidos.map(pedido => {
            const pedidoDay = dayjs(pedido.created_at).format('DD/MM/YYYY')
            if (todayOrders === pedidoDay) {
                return;
            }
            return pedido;
        });

        return response.status(200).json(pedidosFechado);
    }

    async pedidosNaoFechados(request: Request, response: Response) {
        const pedidoRepository = getCustomRepository(PedidoRepository);

        const pedidosAberto = await pedidoRepository.find({ status: "Aberto" });
        const pedidosEmAndamento = await pedidoRepository.find({ status: "Em andamento" });

        return response.status(200).json({ pedidosAberto, pedidosEmAndamento })
    }

    async insertItem(id: string, valor: number) {
        const pedidoRepository = getCustomRepository(PedidoRepository);

        const pedido = await pedidoRepository.findOne({ id });
        console.log(pedido);
        console.log(valor);

        await pedidoRepository.update({ id }, { valor: pedido.valor + valor, status: "Em andamento" });

        return;
    }
}

export default PedidoController;
