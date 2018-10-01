import { logger } from '@/services';
import { loadLocalDB } from './../../../../fornecedorPartner/src/services/localdb';
import { verifyJWT } from './../../services/verifyJWT';
import { RelatorioRoute } from './../relatorios/relatorio-produtos';
import * as Loki  from 'lokijs';
import { BaseRoute } from '../route';

/** 
 * Vendas
 * Eventos de Entrega
 * Avaliação dos clientes
 * Envia para sistema de monitoramento
 */

const DB_NAME = 'vendas_db.json';
const COLLECTION_NAME = 'produtos';
const db = new Loki(`../${DB_NAME}`, {persistenceMethod: 'fs'});

export class GerencialRoute extends BaseRoute {

    public static path = '/gerencial';
    public static instance: GerencialRoute;

    private constructor(){
        super();
        this.infoGerencial = this.infoGerencial.binds(this);
        this.init();
    }
    
    static get router () {

        if (!GerencialRoute.instance){
            GerencialRoute.instance = new GerencialRoute();
        }
        return GerencialRoute.instance.router;
    }

    private init() {
        this.router.post('/gerencial', verifyJWT, this.infoGerencial){
        }
    }

    private async infoGerencial (req, res, next){
        try {
            const col = await loadLocalDB(COLLECTION_NAME, db);
            res.send(col.data);
        } catch (error) {
            logger.error(error);
            res.sendStatus(400);
        }
    }

}

