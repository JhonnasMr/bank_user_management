import { DataSource } from "typeorm";
import { UserModel, TransactionModel } from "../index";


interface PostgreOptions {
    PGHOST: string,
    PGDATABASE: string,
    PGUSER: string,
    PGPASSWORD: string,
    PGPORT: number
}

export class PostgreDataBase {

    private readonly dataSource: DataSource

    constructor(options: PostgreOptions) {
        this.dataSource = new DataSource({
            type: 'postgres',
            host: options.PGHOST,
            port: options.PGPORT,
            username: options.PGUSER,
            password: options.PGPASSWORD,
            database: options.PGDATABASE,
            synchronize: true,
            entities: [UserModel, TransactionModel],
            ssl: {
                rejectUnauthorized: false,
            }
        });
    }

    async connect() {

        await this.dataSource.initialize()
            .then(() => {
                console.log('database connected successfully 🙂');
            })
            .catch((err) => {
                console.log('we cant connect data base 😒 : ', err);
            })

    }

}