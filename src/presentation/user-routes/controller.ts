import { Response, Request } from "express";
import { GetSessionService } from "./services/getSession.service";
import { CustomError } from "../../domain";

export class UserController {

    constructor(
        private readonly getSessionSevice: GetSessionService,
    ) { }

    private handleError = (err: unknown, res: Response) => {

        if (err instanceof CustomError) {
            return res
                .status(err.code)
                .json({
                    message: err.message
                });
        }

        console.log(err)
        return res.status(500).json({
            message: 'something went wrong! 💥🧨'
        })

    }

    getUserSession = (req: Request, res: Response) => {
        const { session } = req.body;
        this.getSessionSevice.execute(session)
            .then(data => {
                return res
                    .status(200)
                    .json(data);
            })
            .catch(err => {
                return this.handleError(err, res);
            })
    }

}