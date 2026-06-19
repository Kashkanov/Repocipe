import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Ingredient } from './ingredients.entity';
import { Step } from './steps.entity';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  cooktime?: number;

  @Column({ nullable: true })
  preptime?: number;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.recipe, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  ingredients: Relation<Ingredient[]>;

  @OneToMany(() => Step, (step) => step.recipe, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  steps: Relation<Step[]>;

  @Column({ nullable: true })
  image?: string;

  @CreateDateColumn({ nullable: true })
  createdAt: Date;
}
