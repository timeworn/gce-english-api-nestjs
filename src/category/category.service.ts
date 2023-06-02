import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>
  ) {
  }

  findAll(): Promise<Category[]> {
    return this.repository.createQueryBuilder('category')
      .leftJoinAndSelect('category.questions', 'question')
      .select('category.id AS id')
      .addSelect('category.name AS name')
      .addSelect('category.createdAt AS createdAt')
      .addSelect('category.updatedAt AS updatedAt')
      .addSelect('COUNT(question.id) AS count')
      .groupBy('category.id')
      .where('question is NULL')
      .orWhere('question.isDeleted is NOT true')
      .getRawMany();
  }

  findById(id: string): Promise<Category> {
    return this.repository.findOne({id});
  }

  add(name: string): Promise<Category> {
    const category = new Category();
    category.name = name;
    return this.repository.save(category);
  }

  bulkAdd(names: string[]): Promise<Category[]> {
    const entries = names.map(x => {
      const category = new Category();
      category.name = x;
      return category;
    });
    return this.repository.save(entries);
  }

}
