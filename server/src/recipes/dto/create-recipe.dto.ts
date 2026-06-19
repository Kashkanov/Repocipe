import { CreateIngredientDto } from './create-ingredient.dto';
import { CreateStepDto } from './create-step.dto';
import {
  ArrayMinSize,
  IsArray,
  IsNumber, IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRecipeDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(255)
  description: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(100)
  cooktime?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(100)
  preptime?: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true }) // Important if nested objects are to be validated too
  @Type(() => CreateIngredientDto)
  ingredients: CreateIngredientDto[];

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateStepDto)
  steps: CreateStepDto[];

  @IsOptional()
  @IsString()
  image: string;
}
