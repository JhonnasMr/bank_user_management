import { Router } from "express";
import { UserRoutes } from "./user-routes/routes";
import { AuthRoutes } from "./auth-routees/routes";
import { TransactionRoutes } from "./transaction-routes/routes";
import { AuthMiddleware } from "./common";

export class AppRoute {

    static get routes(): Router {

        const route = Router();

        route.use('/api/auth', AuthRoutes.routes);

        route.use('/api/users', AuthMiddleware.protect, UserRoutes.routes);

        route.use('/api/transactions', TransactionRoutes.routes);

        return route;

    }

}