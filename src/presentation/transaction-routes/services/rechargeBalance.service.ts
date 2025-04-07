import { UserModel } from "../../../data";
import { CustomError } from "../../../domain";

export class RechargeBalanceService {

    async execute(account_number: number, amount: number) {
        try {

            const user = await UserModel.findOne({
                where: {
                    account_number: account_number,
                    email_verified: true
                }
            })

            if (!user) {
                throw CustomError.notFound('User not found')
            }

            user.balance = Number(user.balance) + amount;
            await user.save();

            return {
                message: 'Balance recharged successfully',
                account_number,
                amount
            };

        } catch (error) {
            CustomError.internalServer('recharge not completed 😒');
        }

    }

}