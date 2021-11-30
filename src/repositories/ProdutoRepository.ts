import { Repository, EntityRepository } from "typeorm";
import { Produto } from "../entities/Produto";

@EntityRepository(Produto)
class ProdutoRepository extends Repository<Produto> {

}

export default ProdutoRepository;
