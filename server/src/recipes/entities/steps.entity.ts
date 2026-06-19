import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { Recipe } from './recipe.entity';

@Entity()
export class Step {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stepNo: number;

  @Column()
  description: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.steps)
  recipe: Relation<Recipe>;
}
