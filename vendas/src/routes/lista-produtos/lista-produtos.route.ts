import { verifyJWT } from '../../services/verifyJWT';
import { NextFunction, Request, Response } from 'express';
import * as REST from 'request-promise';
import * as requisition from 'request-promise';
import { BaseRoute } from '../route';

export class ListarProdutosRoute extends BaseRoute {

  public static path = '/produtos';
  private static instance: ListarProdutosRoute;

  private constructor () {
    super();
    this.listarProdutos = this.listarProdutos.bind(this);
    this.init();
  }

  static get router () {
    if (!ListarProdutosRoute.instance) {
      ListarProdutosRoute.instance = new ListarProdutosRoute();
    }
    return ListarProdutosRoute.instance.router;
  }

  private init () {
    this.router.get('/listar', verifyJWT, this.listarProdutos);
  }

  private async listarProdutos (req, res, next) {
    requisition.get(`${this.ENDPOINT_FORNECEDOR_API}/produtos/listar`, (error, response, body) => {
      if (error) {
        res.status(500).send({ mensagem: 'Erro buscar catalogo de produtos.' });
        return false;
      }
      res.status(200).json(JSON.parse(body));
    });
    return false;
  }

  private async encaminharPedidoCompra (req: Request, res: Response, next: NextFunction) {
    REST.post({
      body : JSON.stringify({'firstname': 'hh'}),
      url : 'http://httpbin.org/post',
      headers : { 'content-type': 'application/json' },
    }, (error, response, body) => {
        if (error) {
          return res.json(error);
        }
        res.json(JSON.parse(body));
    });
    return false;
  }

}
