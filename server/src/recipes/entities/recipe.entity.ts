import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ingredient } from './ingredients.entity';
import { Step } from './steps.entity';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cooktime: number;

  @Column()
  preptime: number;

  @Column()
  description: string;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.recipe, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  ingredients: Ingredient[];

  @OneToMany(() => Step, (step) => step.recipe, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  steps: Step[];

  @Column()
  image: string;

  @CreateDateColumn()
  createdAt: Date;
}
