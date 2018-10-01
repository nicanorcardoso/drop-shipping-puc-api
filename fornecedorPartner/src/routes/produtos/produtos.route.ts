import { logger } from '@/services';
import { NextFunction, Request, Response } from 'express';
import { BaseRoute } from '../route';

export class ProdutosRoute extends BaseRoute {

  public static path = '/produtos';
  private static instance: ProdutosRoute;

  private constructor () {
    super();
    this.produtos = this.produtos.bind(this);
    this.init();
  }

  static get router () {
    if (!ProdutosRoute.instance) {
      ProdutosRoute.instance = new ProdutosRoute();
    }
    return ProdutosRoute.instance.router;
  }

  private init () {
    this.router.get('/', this.produtos);
  }

  private async produtos (req: Request, res: Response, next: NextFunction) {

    logger.info('Rest... produtos...');

    const produtos = [
      {nome: 'Produto 1', valor: 600.00, qtDisponivel: 10},
      {nome: 'Produto 2', valor: 400.99, qtDisponivel: 10},
      {nome: 'Produto 3', valor: 100.99, qtDisponivel: 10},
      {nome: 'Produto 4', valor: 400.99, qtDisponivel: 10},
    ];
    res.json(produtos);
    next();
  }
}
