import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './create-question.dto';
import { Category } from '../category/category.entity';
import { PostAnswerDto } from './post-answer.dto';
import { QuestionQueryDto } from './question-query.dto';

@Injectable()
export class QuestionService {

  constructor(
    @InjectRepository(Question)
    private readonly repository: Repository<Question>
  ) {
  }

  async findAll(query: QuestionQueryDto): Promise<Question[]> {
    if (query.category) {
      return await this.repository.find({
        where: {isDeleted: false, category: {id: query.category}},
        skip: query.skip || 0,
        take: query.limit || 10,
        relations: ['category']
      });
    } else {
      return this.repository.find({
        where: {isDeleted: false},
        skip: query.skip || 0,
        take: query.limit || 10,
      });
    }
  }

  async findOne(questionId: string): Promise<Question> {
    const res = await this.repository.findOne({
      where: {id: questionId},
      relations: ['category']
    });
    if (res) {
      return res;
    } else {
      throw new NotFoundException('No question matching with this id.');
    }
  }

  async update(id: string, body: CreateQuestionDto): Promise<Question> {
    const item = await this.findOne(id);
    return this.repository.save({...item, ...body});
  }

  add(body: CreateQuestionDto, category: Category): Promise<Question> {
    const question = new Question();
    question.question = body.question;
    question.options = body.options;
    question.answer = body.answer;
    question.category = category;

    return this.repository.save(question);
  }

  addBulk(body: CreateQuestionDto[], category: Category) {
    const questions = body.map(item => {
      const question = new Question();
      question.question = item.question;
      question.options = item.options;
      question.answer = item.answer;
      question.category = category;
      return question;
    });
    return this.repository.save(questions);
  }

  async delete(id: string): Promise<boolean> {
    const item = await this.repository.findOne({id, isDeleted: false});
    if (item) {
      await this.repository.save({...item, isDeleted: true, deletedAt: new Date().toISOString()});
      return true;
    } else {
      return false;
    }
  }

  async postAnswer(id: string, body: PostAnswerDto) {
    const question = await this.findOne(id);
    return question.answer === body.answer;
  }

}
