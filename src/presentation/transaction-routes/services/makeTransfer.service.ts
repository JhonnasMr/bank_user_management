import { TransactionModel, UserModel } from "../../../data";
import { CustomError, MakeTransferDto } from "../../../domain/";

export class MakeTransferService {

    async execute(options: MakeTransferDto) {

        // 1.- verificamos que ambos usuarios pererteneezcan a nuestra entidad
        const sender = await this.isUserbank(options.sender_account_number);
        const receiver = await this.isUserbank(options.receiver_account_number);
        // 2.- creeamos la transferencia
        if (!this.transferIsPosible(sender.balance, options.amount)) {
            throw CustomError.internalServer('The issuer does not have sufficient balance');
        }

        const transfer = new TransactionModel();
        transfer.sender_id = sender.id;
        transfer.receiver_id = receiver.id;
        transfer.amount = options.amount;

        await transfer.save();

        // 3.- hacemos la operacion de suma y resta.
        await this.transferOperation(sender, receiver, options.amount);

        // 4.- retornamos la trasferencia si es q todo salio bien
        return transfer;

    }

    private async isUserbank(account: number) {

        try {

            const user = await UserModel.findOne({
                where: { account_number: account }
            })

            if (!user) {
                throw CustomError.badRequest('account number dont exist!');
            }

            return user;

        } catch (error) {
            throw CustomError.internalServer('something went wrong 💥');
        }

    }

    private async transferOperation(sender: UserModel, received: UserModel, amount: number) {

        const initial_sender_balance = Number(sender.balance);
        const initial_received_balance = Number(received.balance);

        sender.balance = initial_sender_balance - amount;
        received.balance = initial_received_balance + amount;

        try {

            await sender.save();
            await received.save();

        } catch (error) {

            sender.balance = initial_sender_balance;
            received.balance = initial_received_balance;
            await sender.save();
            await received.save();

            throw CustomError.internalServer('transaction not completed');
        }

    }

    private transferIsPosible(sender_amount: number, transfer_amount: number): boolean {
        return sender_amount >= transfer_amount;
    }

}