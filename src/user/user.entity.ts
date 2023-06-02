import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { hash } from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Role } from '../common/role';

@Entity('users')
export class User {

  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  username: string;

  @ApiProperty({enum: Role})
  @Column({type: 'enum', enum: Role})
  role: Role;

  @Column()
  @Exclude()
  password: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: string;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: string;

  @BeforeInsert()
  hashPassword() {
    return hash(this.password, 10).then(encrypted => this.password = encrypted);
  }

}
