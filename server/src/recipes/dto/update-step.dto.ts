import { PartialType } from '@nestjs/mapped-types';
import { CreateStepDto } from './create-step.dto';
import { IsInt, IsOptional } from 'class-validator';

export class UpdateStepDto extends PartialType(CreateStepDto) {
  @IsOptional()
  @IsInt()
  id?: number;
}
