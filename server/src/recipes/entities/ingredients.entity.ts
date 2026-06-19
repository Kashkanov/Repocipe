import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { Recipe } from './recipe.entity';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  qty?: number;

  @Column({ nullable: true })
  unit?: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.ingredients)
  recipe: Relation<Recipe>;
}
