import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { CreateCategoryDto } from './create-category.dto';

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@ApiTags('Category')
@Controller('categories')
export class CategoryController {

  constructor(
    private readonly categoryService: CategoryService
  ) {
  }

  @ApiOkResponse({type: Category, isArray: true})
  @Get()
  getAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @ApiOkResponse({type: Category})
  @Post()
  add(@Body() body: CreateCategoryDto): Promise<Category> {
    return this.categoryService.add(body.name);
  }

}
