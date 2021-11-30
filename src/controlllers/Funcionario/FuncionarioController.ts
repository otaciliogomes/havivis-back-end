import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { sign } from "jsonwebtoken";
import { hash } from "bcryptjs";
import FuncionarioRepository from "../../repositories/FuncionarioRepository";

class FuncionarioController {
    async create(request: Request, response: Response) {
        const { nome, email, user, senha, tipo } = request.body;

        if (!nome || !email || !user || !tipo) {
            throw new Error("ERROR: 002 Falta argumentos");
        }

        const userRepository = getCustomRepository(FuncionarioRepository);
        const userAlredyExist = await userRepository.findOne({ email });

        if (userAlredyExist) {
            throw new Error("ERROR: 003 Usuario já cadastro");
        }

        const token = sign({ email },
            process.env.SECRET_APP_AUTHENTUCATE,
            { expiresIn: "1d" }
        )

        const passwordHash = await hash(senha, 8);

        const userCreated = userRepository.create({
            nome,
            email,
            token,
            user,
            tipo,
            senha: passwordHash
        });

        await userRepository.save(userCreated);

        return response.status(201).json(userCreated)
    }

    async index(request: Request, response: Response) {
        const { id } = request.params;
        if (!id) {
            throw new Error("ERROR: Funcinario não informado");
        }
        const funcinarioRepository = getCustomRepository(FuncionarioRepository);

        const funcionario = await funcinarioRepository.findOne({id});

        return response.status(200).json(funcionario);
    }

    async show(request: Request, response: Response) {
        const funcinarioRepository = getCustomRepository(FuncionarioRepository);

        const listFuncionario = await funcinarioRepository.find()

        return response.status(200).json(listFuncionario);
    }

    async login(request: Request, response: Response) {
        const { user, senha } = request.body;

        if (!senha) {
            throw new Error("Informe a senha");
        }

        if (!user) {
            throw new Error("Informe o usuário");
        }
        const funcinarioRepository = getCustomRepository(FuncionarioRepository);

        const userExist = await funcinarioRepository.findOne({ user });

        if (!userExist) {
            throw new Error("Usuario não existe");
        }

        const token = sign({},
            process.env.SECRET_APP_AUTHENTUCATE,
            { expiresIn: "2d" }
        )

        delete userExist.token;

        await funcinarioRepository.update({ id: userExist.id }, { token })

        return response.status(200).json({ ...userExist, token });
    }
}

export { FuncionarioController };
