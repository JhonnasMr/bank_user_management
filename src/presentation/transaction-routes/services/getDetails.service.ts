import { TransactionModel } from "../../../data";
import { CustomError } from "../../../domain";

export class GetDetailsService {

    async execute(transactionID: string) {

        const transaction = await TransactionModel.findOne({
            where: {
                id: transactionID
            },
            relations: ['user']
        })

        if (!transaction) {
            throw CustomError.notFound('transaction not found');
        }

        return transaction;

    }

}