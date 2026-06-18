import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Recipe } from './recipe.entity';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  qty: number;

  @Column()
  unit: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.ingredients)
  recipe: Recipe;
}
