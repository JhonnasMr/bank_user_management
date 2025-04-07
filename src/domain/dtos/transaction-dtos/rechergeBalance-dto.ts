

export class RechargeBalanceDto {

    constructor(
        public readonly account_number: number,
        public readonly amount: number
    ) { }

    static execute(body: { [key: string]: any }): [string?, RechargeBalanceDto?] {

        const { account_number, amount } = body;

        if (!account_number || !amount) {
            return ['account_number and amount are required'];
        }

        if (typeof account_number !== 'number' || typeof amount !== 'number') {
            return ['account_number and amount must be numbers'];
        }

        if (String(account_number).length != 14) {
            return ['format sender account number is invalid 😒'];
        }

        return [
            undefined,
            new RechargeBalanceDto(
                account_number,
                amount
            )
        ];

    }

}