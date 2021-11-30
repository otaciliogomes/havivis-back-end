import { Repository, EntityRepository } from "typeorm";
import { Cliente } from "../entities/Cliente";

@EntityRepository(Cliente)
class ClienteRepository extends Repository<Cliente> {

}

export default ClienteRepository;
