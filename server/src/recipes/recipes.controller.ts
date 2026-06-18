import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.recipesService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.recipesService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateRecipeDto) {
    return this.recipesService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateRecipeDto) {
    console.log('CONTROLLER RECEIVED:', dto);
    return this.recipesService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.recipesService.remove(id);
  }
}
