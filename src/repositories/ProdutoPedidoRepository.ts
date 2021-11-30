import { Repository, EntityRepository } from "typeorm";
import { Produto_Pedido } from "../entities/Produto_Pedido";

@EntityRepository(Produto_Pedido)
class ProdutoPedidoRepository extends Repository<Produto_Pedido> {

}

export default ProdutoPedidoRepository;
