import { Router } from "express";
import { UserController } from "./controller";
import { GetSessionService } from "./services/getSession.service";


export class UserRoutes {

    static get routes(): Router {

        const getSessionService = new GetSessionService();
        const userController = new UserController(getSessionService);

        const route = Router();

        route.get('/me', userController.getUserSession);

        return route;

    }

}