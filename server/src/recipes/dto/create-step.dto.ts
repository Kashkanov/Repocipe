import { IsNumber, IsString, MaxLength, Min, MinLength } from 'class-validator';

export class CreateStepDto {
  @IsNumber()
  @Min(0)
  stepNo: number;

  @IsString()
  @MinLength(3)
  @MaxLength(1000)
  description: string;
}
