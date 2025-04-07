import { Request, Response } from "express"
import { CustomError, MakeTransferDto } from "../../domain"
import { MakeTransferService } from "./services/makeTransfer.service";
import { GetDetailsService } from "./services/getDetails.service";
import { GetHistorialService } from "./services/getHistorial.service";
import { RechargeBalanceService } from "./services/rechargeBalance.service";
import { RechargeBalanceDto } from "../../domain/dtos/transaction-dtos/rechergeBalance-dto";


export class TransactionsController {

    constructor(
        private readonly makeTransferService: MakeTransferService,
        private readonly getDetailService: GetDetailsService,
        private readonly getHistorialService: GetHistorialService,
        private readonly rechargeBalanceService: RechargeBalanceService
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

    getHistorial = (req: Request, res: Response) => {

        const { session } = req.body;

        if (!session) {
            return res.status(401).json({
                message: 'session not found'
            })
        }

        this.getHistorialService.execute(session.id)
            .then(data => {
                return res.status(200).json(data);
            })
            .catch(err => {
                this.handleError(err, res);
            })

    }

    getTransactionDetails = (req: Request, res: Response) => {

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: 'transaction id not found'
            })
        }

        this.getDetailService.execute(id)
            .then(data => {
                return res.status(200).json(data);
            })
            .catch(err => {
                this.handleError(err, res);
            })
    }

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

    rechargeBalance = (req: Request, res: Response) => {
        const [err, rechargeBalanceDto] = RechargeBalanceDto.execute(req.body);

        if (err) {
            return res
                .status(421)
                .json({
                    message: err
                })
        }

        const { account_number, amount } = rechargeBalanceDto!;

        this.rechargeBalanceService.execute(account_number, amount)
            .then(data => {
                return res
                    .status(200)
                    .json(data);
            })
            .catch(err => {
                return this
                    .handleError(err, res);
            })
    }

}