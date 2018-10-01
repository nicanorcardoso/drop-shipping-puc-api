import { NextFunction, Request, Response } from 'express';
import * as Loki from 'lokijs';
import { loadLocalDB, logger } from 'services';
import { BaseRoute } from '../route';
import { verifyJWT } from 'services/verifyJWT';

const DB_NAME = 'vendas_db.json';
const COLLECTION_NAME = 'produtos';
const db = new Loki(`../${DB_NAME}`, { persistenceMethod: 'fs' });

export class RelatorioRoute extends BaseRoute {

  public static path = '/relatorio';
  private static instance: RelatorioRoute;

  private constructor () {
    super();
    this.relatorioVendas = this.relatorioVendas.bind(this);
    this.relatorioLucratividade = this.relatorioLucratividade.bind(this);
    this.relatorioGiroEstoque = this.relatorioGiroEstoque.bind(this);
    this.relatorioCusto = this.relatorioCusto.bind(this);
    this.init();
  }

  static get router () {
    if (!RelatorioRoute.instance) {
      RelatorioRoute.instance = new RelatorioRoute();
    }
    return RelatorioRoute.instance.router;
  }

  private init () {
    
    this.router.post('/vendas', verifyJWT, this.relatorioVendas);
    this.router.post('/lucratividade', verifyJWT, this.relatorioLucratividade);
    this.router.post('/giro', verifyJWT, this.relatorioGiroEstoque);
    this.router.post('/custo', verifyJWT, this.relatorioCusto);
  }

  private async relatorioVendas (req: Request, res: Response, next: NextFunction) {
    try {
      const col = await loadLocalDB(COLLECTION_NAME, db);
      res.send(col.data);
    } catch (err) {
      logger.error(err);
      res.sendStatus(400);
    }
  }

 private async relatorioLucratividade (req: Request, res: Response, next: NextFunction) {
    res.send({});
 }

 private async relatorioGiroEstoque (req: Request, res: Response, next: NextFunction) {
    res.send({});
 }

 private async relatorioCusto (req: Request, res: Response, next: NextFunction) {
  res.send({});
 } 
}

