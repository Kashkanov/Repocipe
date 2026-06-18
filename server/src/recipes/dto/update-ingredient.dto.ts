import { IsInt, IsOptional } from 'class-validator';
import { CreateIngredientDto } from './create-ingredient.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateIngredientDto extends PartialType(CreateIngredientDto) {
  @IsOptional()
  @IsInt()
  id?: number;
}
