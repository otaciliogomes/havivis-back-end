import { Request, Response } from "express";
import { getCustomRepository } from "typeorm"
import ClienteRepository from "../../repositories/ClienteRepository";

class ClienteController {
    async create(request: Request, response: Response) {
        const { nome, endereco, telefone } = request.body;

        if (!nome || !endereco || !telefone) {
            throw new Error("ERROR: Falta argumentos");
        }

        const clienteRepository = getCustomRepository(ClienteRepository)

        const cliente = clienteRepository.create({ nome, endereco, telefone });

        await clienteRepository.save(cliente);

        return response.status(201).json(cliente)
    }

    async show(request: Request, response: Response) {
        const clienteRepository = getCustomRepository(ClienteRepository)

        const listCliente = await clienteRepository.find()

        return response.status(200).json(listCliente);
    }

    async delete(request: Request, response: Response) {
        const clienteRepository = getCustomRepository(ClienteRepository);
        const { id } = request.params;

       const user = await clienteRepository.delete(id);

        return response.status(204).json(user)
    }
}

export default ClienteController;
