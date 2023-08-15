import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Stream {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'stream_id',
  })
  id: bigint;

  @Column({
    nullable: false,
    default: '',
  })
  name: string;

  @Column({
    nullable: true,
    default: '',
  })
  description: string;

  @Column({
    nullable: false,
    default: '',
  })
  url: string;

  @Column({
    nullable: false,
    default: '',
  })
  image: string;

  @Column({
    nullable: true,
    default: '',
  })
  category: string;
}
