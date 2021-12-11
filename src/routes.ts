import { Router } from "express";

import { FuncionarioController } from "./controlllers/Funcionario/FuncionarioController";


import PedidoController from "./controlllers/Pedido/PedidosController"
import ClienteController from "./controlllers/Cliente/ClienteController"
import ProdutoController from "./controlllers/Produto/ControllerProduto";

import ProdutoPedidoController from "./controlllers/ProdutoPedido/ProdutoPedidoController"

import { EnsureAuthenticate } from "./middleware/ensureAuthenticate";

const router = Router();

//Users
const funcionarioController = new FuncionarioController();

const pedidoController = new PedidoController();
const clienteController = new ClienteController();
const produtoController = new ProdutoController();
const produtoPedidoController = new ProdutoPedidoController();

//Funcionario
router.post("/funcionarios", funcionarioController.create);
router.get("/funcionarios", funcionarioController.show);
router.get("/funcionarios/:id", funcionarioController.index);
router.post("/funcionarios_login", funcionarioController.login);
router.delete("/funcionarios/:id", funcionarioController.delete);

//Login
router.post("/funcionarios/logar", funcionarioController.logar);

//Pedido
router.post("/pedidos", pedidoController.create);
router.get("/pedidos/:id", pedidoController.showOne);
router.get("/pedidos", pedidoController.show);
router.post("/pedidos_fechar", pedidoController.closePedido);
router.get("/pedidos_total", pedidoController.getTotalPediso);
router.get("/pedidos_hoje", pedidoController.pedidosHoje);
router.get("/pedidos_fechados_hoje", pedidoController.pedidosFechadosHoje);
router.get("/pedidos_nao_fechados", pedidoController.pedidosNaoFechados);
router.post("/pedidos_cliente", pedidoController.addClientePedido);
router.delete("/pedidos/:id", pedidoController.delete);

//Cliente
router.post("/clientes", clienteController.create);
router.get("/clientes", clienteController.show);
router.get("/clientes/:id", clienteController.index);
router.delete("/clientes/:id", clienteController.delete);

//Produto
router.post("/produtos", produtoController.create);
router.get("/produtos", produtoController.show);
router.get("/produtos/:id", produtoController.index);
router.put("/produtos", produtoController.update);
router.delete("/produtos/:id", produtoController.delete);

// Produto Pedido
router.post("/produto_pedido", produtoPedidoController.create);
router.delete("/produto_pedido/:produto_id/:pedido_id", produtoPedidoController.delete);
router.get("/produto_pedido/:id", produtoPedidoController.show);

export { router };
