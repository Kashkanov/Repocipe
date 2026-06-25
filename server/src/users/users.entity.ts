import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../common/enums/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ type: 'simple-enum', enum: Role, default: Role.USER })
  role: Role;
}
