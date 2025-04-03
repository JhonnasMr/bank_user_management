

export class MakeTransferDto {

    constructor(
        public readonly sender_account_number: number,
        public readonly receiver_account_number: number,
        public readonly amount: number,
    ) { }

    static execute(body: { [key: string]: any }): [string?, MakeTransferDto?] {

        const { sender_account_number, receiver_account_number, amount } = body;

        if (sender_account_number === receiver_account_number) return ['transfer not valid 🤨'];

        if (!sender_account_number) return ['sender account number is reqeuired 😒'];
        if (typeof sender_account_number !== 'number') return ['sender account must be type number 😒'];

        if (!receiver_account_number) return ['receiver account number is reqeuired 😒'];
        if (typeof receiver_account_number !== 'number') return ['receiver account must be type number 😒'];

        if (!amount) return ['amount is reqeuired 😒'];
        if (typeof amount !== 'number') return ['amount must be decimal number'];
        if (amount < 5) return ['minimum amount is $5 😒'];

        if (String(sender_account_number).length != 14) return ['format sender account number is invalid 😒'];
        if (String(receiver_account_number).length != 14) return ['format receiver account number id is invalid 😒'];

        return [
            undefined,
            new MakeTransferDto(
                Number(sender_account_number),
                Number(receiver_account_number),
                Number(amount),
            )
        ];

    }

}