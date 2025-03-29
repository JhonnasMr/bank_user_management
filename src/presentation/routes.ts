
import { Router, Request, Response } from "express";

export class AppRoute {

    static get routes(): Router {

        const route = Router();

        route.get('/', (req: Request, res: Response) => {
            return res.status(200).json({
                message: "Hello from the server!"
            })
        })

        return route;

    }

}