import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateIngredientDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  qty: number;

  @IsString()
  @MinLength(1)
  @MaxLength(50)
  @IsOptional()
  unit: string;

  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @IsOptional()
  description: string;
}
