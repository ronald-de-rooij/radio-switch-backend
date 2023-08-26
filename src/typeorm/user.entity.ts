import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
export type UserRoleType = 'admin' | 'editor' | 'ghost';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_id',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  username: string;

  @Column({
    name: 'email_address',
    nullable: false,
    default: '',
  })
  email: string;

  @Column({
    nullable: false,
    default: '',
  })
  password: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'user', 'ghost'],
    nullable: false,
    default: 'user',
  })
  role: UserRoleType;
}
