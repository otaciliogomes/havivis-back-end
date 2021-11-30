import { Repository, EntityRepository } from "typeorm";
import { Pedido } from "../entities/Pedido";

@EntityRepository(Pedido)
class PedidoRepository extends Repository<Pedido> {

}

export default PedidoRepository;
