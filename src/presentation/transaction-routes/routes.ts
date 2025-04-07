import { Router } from "express"
import { TransactionsController } from "./controller";
import { MakeTransferService } from "./services/makeTransfer.service";
import { GetDetailsService } from "./services/getDetails.service";
import { GetHistorialService } from "./services/getHistorial.service";
import { RechargeBalanceService } from "./services/rechargeBalance.service";

export class TransactionRoutes {

    static get routes(): Router {

        const makeTransferService = new MakeTransferService();
        const getDetailService = new GetDetailsService();
        const getHistorialService = new GetHistorialService();
        const rechargeBalanceService = new RechargeBalanceService();
        const controller = new TransactionsController(
            makeTransferService,
            getDetailService,
            getHistorialService,
            rechargeBalanceService
        );

        const route = Router();

        route.post('/', controller.makeTransfer);

        route.get('/', controller.getHistorial);

        route.get('/:id', controller.getTransactionDetails);

        route.post('/recharge-balance', controller.rechargeBalance);

        return route;

    }

}