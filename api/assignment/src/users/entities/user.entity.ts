import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;
}
