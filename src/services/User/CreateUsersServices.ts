import { getCustomRepository } from "typeorm";
import { sign } from "jsonwebtoken";
import { hash } from "bcryptjs";
import FuncionarioRepository from "../../repositories/FuncionarioRepository";
import { request } from "express";

export interface IUserRequest {
    name: string;
    email: string;
    user: string;
    tipo: boolean;
    password: string;
}

class CreateUsersServices {
    async execute({ name, email, user, tipo, password}: IUserRequest) {
        const userRepository = getCustomRepository(FuncionarioRepository);

        if (!name || !email || !user || !tipo) {
            throw new Error("ERROR: 002 Falta argumentos");
        }

        const userAlredyExist = await userRepository.findOne({ email });

        if (userAlredyExist) {
            throw new Error("ERROR: 003 Usuario já cadastro");
        }

        const token = sign({ email },
            process.env.SECRET_APP_AUTHENTUCATE,
            { expiresIn: "1d" }
        )

        const passwordHash = await hash(password, 8);

        const userCreated = userRepository.create({
            name,
            email,
            token,
            user,
            tipo,
            password: passwordHash
        });

        await userRepository.save(userCreated);

        return userCreated;
    }

    async index(id:string) {
        if(!id) {
            throw new Error("ERROR: Funcinario não informado");
        }
        const funcinarioRepository = getCustomRepository(FuncionarioRepository);

        const funcionario = funcinarioRepository.findOne(id);

        return funcionario;
    }
}

export { CreateUsersServices };
