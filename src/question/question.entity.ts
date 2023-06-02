import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Category } from '../category/category.entity';

@Entity('questions')
export class Question {

  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  question: string;

  @ApiProperty()
  @Column({type: 'simple-array'})
  options: string[];

  @ApiProperty()
  @Column()
  answer: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: string;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: string;

  @Exclude()
  @Column({nullable: true, default: false})
  isDeleted: boolean;

  @Exclude()
  @Column({type: 'datetime', nullable: true})
  deletedAt: string;

  @ManyToOne(type => Category, category => category.questions)
  category: Category;

}
