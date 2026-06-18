import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateRecipeDto } from './create-recipe.dto';
import { UpdateStepDto } from './update-step.dto';
import { UpdateIngredientDto } from './update-ingredient.dto';

export class UpdateRecipeDto extends PartialType(
  OmitType(CreateRecipeDto, ['ingredients', 'steps'] as const),
) {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateIngredientDto)
  ingredients?: UpdateIngredientDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateStepDto)
  steps?: UpdateStepDto[];
}
