import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { CategoryModule } from '../category/category.module';
import { UserModule } from '../user/user.module';
import { QuestionModule } from '../question/question.module';

@Module({
  imports: [
    CategoryModule,
    UserModule,
    QuestionModule
  ],
  providers: [SeedService]
})
export class SeedModule {
}
