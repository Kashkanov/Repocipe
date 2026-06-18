import { Module } from '@nestjs/common';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { Ingredient } from './entities/ingredients.entity';
import { Step } from './entities/steps.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recipe]),
    TypeOrmModule.forFeature([Ingredient]),
    TypeOrmModule.forFeature([Step]),
  ],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}
