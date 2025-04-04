import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column('text', { nullable: false })
    password: string

    @Column('varchar', { length: 14, nullable: true, unique: true })
    account_number: number

    @Column('decimal', { default: 0.00 })
    balance: number

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date

}