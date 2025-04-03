import { Request, Response } from "express"
import { MakeTransferService } from "./services/makeTransfer.service"
import { CustomError, MakeTransferDto } from "../../domain"


export class TransactionsController {

    constructor(
        private readonly makeTransferService: MakeTransferService,
    ) { }

    private handleError = (err: unknown, res: Response) => {

        if (err instanceof CustomError) {
            return res.status(err.code).json({
                message: err.message
            });
        }

        console.log(err)
        return res.status(500).json({
            message: 'something went wrong! 💥🧨'
        })

    }

    getHistorial = (req: Request, res: Response) => { }

    getTransactionDetails = (req: Request, res: Response) => { }

    makeTransfer = (req: Request, res: Response) => {

        const [err, makeTransferDto] = MakeTransferDto.execute(req.body);

        if (err) {
            return res
                .status(421)
                .json({
                    message: err
                })
        }

        this.makeTransferService.execute(makeTransferDto!)
            .then(data => {
                return res.status(200).json(data);
            })
            .catch(err => {
                return this.handleError(err, res);
            })

    }

}