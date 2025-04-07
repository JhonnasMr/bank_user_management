import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TransactionModel } from "./transaction-model";

// Table User {
//     id uuid [pk]
//     name varchar(50) [not null]
//     email varchar(50) [not null, unique]
//     password text [not null]
//     account_number varchar(20) [not null]
//     balance decimal(10,2) [default: 0.00]
//     created_at timestamp [default: 'now()', not null]
// }

@Entity()
export class UserModel extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', { length: 50, nullable: false })
    name: string

    @Column('varchar', { length: 50, nullable: false, unique: true })
    email: string

    @Column('boolean', { default: false })
    email_verified: boolean

    @Column('text', { nullable: false })
    password: string

    @Column('varchar', { length: 14, nullable: true, unique: true })
    account_number: number

    @Column('decimal', { default: 0.00 })
    balance: number

    @Column('timestamp', {
        default: () => 'CURRENT_TIMESTAMP',
        nullable: false,
    })
    created_at: Date

    @OneToMany(() => TransactionModel, (transactionModel) => transactionModel.user)
    transaction: TransactionModel[]

}