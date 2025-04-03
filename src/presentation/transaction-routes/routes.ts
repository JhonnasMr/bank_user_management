import { Router } from "express"
import { TransactionsController } from "./controller";
import { MakeTransferService } from "./services/makeTransfer.service";

export class TransactionRoutes {

    static get routes(): Router {

        const makeTransferService = new MakeTransferService();
        const controller = new TransactionsController(
            makeTransferService
        );

        const route = Router();

        route.post('/', controller.makeTransfer);

        route.get('/', controller.getHistorial);

        route.get('/:id', controller.getTransactionDetails);

        return route;

    }

}