import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

// Table transaction {
//     id uuid [pk]
//     sender_id uuid [not null]
//     receiver_id uuid [not null]
//     amount decimal(10,2) [not null]
//     transaction_date timestamp [default: 'now()', not null]
// }

@Entity()
export class TransactionModel {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('uuid', { nullable: false })
    sender_id: string

    @Column('uuid', { nullable: false })
    receiver_id: string

    @Column('decimal', { precision: 10, scale: 2 })
    amount: number

    @CreateDateColumn({ type: "timestamp" })
    transactionDate: Date;

}