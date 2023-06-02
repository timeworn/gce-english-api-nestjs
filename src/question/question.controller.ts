import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiImplicitParam } from '@nestjs/swagger/dist/decorators/api-implicit-param.decorator';
import { AuthGuard } from '@nestjs/passport';
import { QuestionService } from './question.service';
import { Question } from './question.entity';
import { CreateQuestionDto } from './create-question.dto';
import { CategoryService } from '../category/category.service';
import { Role } from '../common/role';
import { PostAnswerDto } from './post-answer.dto';
import { QuestionQueryDto } from './question-query.dto';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Question')
@Controller('questions')
export class QuestionController {

  constructor(
    private readonly questionService: QuestionService,
    private readonly categoryService: CategoryService
  ) {
  }

  @ApiOkResponse({type: Question, isArray: true})
  @ApiImplicitQuery({name: 'category', required: false, type: String})
  @ApiImplicitQuery({name: 'skip', required: false, type: Number})
  @ApiImplicitQuery({name: 'limit', required: false, type: Number})
  @Get()
  async getAll(@Query() query: QuestionQueryDto, @Request() req): Promise<Question[]> {
    // query will be used for filter by category
    const res = await this.questionService.findAll(query);
    // TODO: remove answer field from response when student makes query, uncomment below after demo,
    // if (req.user.role === Role.Student) {
    //   res.forEach(x => {
    //     delete x.answer;
    //   });
    // }
    return res;
  }

  @ApiOkResponse({type: Question})
  @Post()
  async add(@Body() body: CreateQuestionDto): Promise<Question> {
    // check validation
    if (!body.options.find(x => x === body.answer)) {
      throw new BadRequestException('Include valid answer to options.');
    }
    if (body.options.length < 4) {
      throw new BadRequestException('At least 4 options are required.');
    }
    const invalidOptions = body.options.filter(x => !x);
    if (invalidOptions && invalidOptions.length > 0) {
      throw new BadRequestException('All options are required.');
    }
    const category = await this.categoryService.findById(body.categoryId);
    return this.questionService.add(body, category);
  }

  @ApiOkResponse({type: Question})
  @ApiImplicitParam({name: 'id', required: true})
  @Get(':id')
  getById(@Param('id') id): Promise<Question> {
    return this.questionService.findOne(id);
  }

  @ApiOkResponse({type: Question})
  @ApiImplicitParam({name: 'id', required: true})
  @Put(':id')
  update(@Param('id') id, @Body() body: CreateQuestionDto): Promise<Question> {
    return this.questionService.update(id, body);
  }

  @ApiOkResponse({type: Boolean})
  @ApiImplicitParam({name: 'id', required: true})
  @Delete(':id')
  delete(@Param('id') id): Promise<boolean> {
    return this.questionService.delete(id);
  }

  @ApiOkResponse({type: Boolean})
  @ApiImplicitParam({name: 'id', required: true})
  @Post(':id/answer')
  postAnswer(@Param('id') id, @Body() body: PostAnswerDto): Promise<boolean> {
    return this.questionService.postAnswer(id, body);
  }

}
