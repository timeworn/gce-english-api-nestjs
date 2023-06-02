import { Injectable } from '@nestjs/common';
import * as Faker from 'faker';
import { CategoryService } from '../category/category.service';
import { UserService } from '../user/user.service';
import { QuestionService } from '../question/question.service';
import { Role } from '../common/role';
import { fakeQuestion } from '../utils/faker.util';

@Injectable()
export class SeedService {

  constructor(
    private readonly categoryService: CategoryService,
    private readonly userService: UserService,
    private readonly questionService: QuestionService
  ) {
  }

  async start() {
    await this.seedCategories();
    await this.seedUsers();
    // await this.seedQuestions(100); // open this line when you want to seed database with dummy data
  }

  async seedUsers() {
    await this.userService.add({username: 'nacy', password: 'password', role: Role.Student}, false);
    await this.userService.add({username: 'diana', password: 'password', role: Role.Teacher}, false);
  }

  async seedCategories(count = 10) {
    const res = await this.categoryService.findAll();
    let seedCount = count - res.length;
    if (!seedCount) {
      return;
    }
    const seeds = [];
    while (seedCount) {
      seeds.push(Faker.random.word());
      seedCount--;
    }
    await this.categoryService.bulkAdd(seeds);
    return;
  }

  async seedQuestions(count: number) {
    const categories = await this.categoryService.findAll();
    const questions = [];
    while (count) {
      questions.push(fakeQuestion());
      count--;
    }
    await this.questionService.addBulk(questions, categories[0]);
  }


}
