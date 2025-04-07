import { RelationId } from "typeorm";
import { TransactionModel } from "../../../data";
import { CustomError } from "../../../domain";

export class GetHistorialService {

    async execute(sessionID: string) {

        const transactions = await TransactionModel.find({
            where: {
                sender_id: sessionID
            },
            relations: ['user']
        });

        if (!transactions) {
            CustomError.unAutorized('transaction not found');
        }

        return transactions;

    }

}