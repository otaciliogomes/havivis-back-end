import { Repository, EntityRepository } from "typeorm";
import { Funcionario } from "../entities/Funcionario";

@EntityRepository(Funcionario)
class FuncionarioRepository extends Repository<Funcionario> {

}

export default FuncionarioRepository;
