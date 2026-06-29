import { Module } from '@nestjs/common';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';

@Module({
  // imports: [
  //   TypeOrmModule.forFeature([Recipe]),
  //   TypeOrmModule.forFeature([Ingredient]),
  //   TypeOrmModule.forFeature([Step]),
  // ],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}
