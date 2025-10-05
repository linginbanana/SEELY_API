//user.entity.ts
import * as bcrypt from 'bcrypt';
import { BeforeInsert } from 'typeorm';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false,
  })
  username: string;

  @Column()
  password: string;

  /*@Column({ nullable: true })
  ownerId: number;*/

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Column({
    type: 'varchar',
    default: Role.USER,
  })
  role: Role;
}
