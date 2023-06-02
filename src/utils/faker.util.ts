import * as Faker from 'faker';
import { CreateQuestionDto } from '../question/create-question.dto';

export function fakeQuestion() {
  let optionCounts = Faker.random.number({min: 4, max: 6});
  const options = [];
  while (optionCounts) {
    options.push(Faker.random.word());
    optionCounts--;
  }
  const question: CreateQuestionDto = {
    options: options,
    answer: options[Faker.random.number({min: 0, max: options.length - 1})],
    question: Faker.lorem.sentence(),
    categoryId: Faker.random.uuid() // this is actually useless
  };
  return question;
}
