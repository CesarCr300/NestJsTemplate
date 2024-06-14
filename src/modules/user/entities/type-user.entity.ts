import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { EntityBase } from 'src/base/entity.base';

@Entity({ name: 'tbl_user_type' })
export class UserType implements EntityBase {
  @PrimaryGeneratedColumn({ name: 'int_id' })
  id: number;
  @Column({ name: 'vch_name' })
  name: string;

  @OneToMany(() => User, (user) => user.userType)
  users: User[];
}
