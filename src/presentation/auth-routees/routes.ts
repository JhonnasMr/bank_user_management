import { Router } from "express";

import { AuthController } from "./controller";

import { RegisterUserService } from "./services/registerUser.service";
import { LoginUserService } from "./services/loginUser.service";


export class AuthRoutes {

    static get routes(): Router {

        const registerUser = new RegisterUserService();
        const loginUser = new LoginUserService();
        const authController = new AuthController(
            registerUser,
            loginUser
        );

        const route = Router();

        route.post('/register', authController.registerUser);

        route.post('/login', authController.loginUser);

        return route;

    }

}