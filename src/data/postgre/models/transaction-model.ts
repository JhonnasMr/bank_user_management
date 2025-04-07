import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserModel } from "./user-model";

// Table transaction {
//     id uuid [pk]
//     sender_id uuid [not null]
//     receiver_id uuid [not null]
//     amount decimal(10,2) [not null]
//     transaction_date timestamp [default: 'now()', not null]
// }

@Entity()
export class TransactionModel extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('uuid', { nullable: false })
    sender_id: string

    @Column('uuid', { nullable: false })
    receiver_id: string

    @Column('decimal', { precision: 10, scale: 2 })
    amount: number

    @Column('timestamp', {
        default: () => 'CURRENT_TIMESTAMP',
        nullable: false,
    })
    transaction_date: Date;

    @ManyToOne(() => UserModel, (userModel) => userModel.transaction)
    @JoinColumn({ name: 'sender_id', referencedColumnName: 'id' })
    user: UserModel

}