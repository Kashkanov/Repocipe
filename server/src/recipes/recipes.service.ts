import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DRIZZLE } from '../db/db.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../db/schema';
import { desc, eq, ilike } from 'drizzle-orm';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(@Inject(DRIZZLE) private db: NodePgDatabase<typeof schema>) {}

  async findAll(page: number = 1, limit: number = 8, search?: string) {
    const recipes = await this.db
      .select()
      .from(schema.recipes)
      .where(ilike(schema.recipes.name, `%${search}%`))
      .limit(limit)
      .offset((page - 1) * limit);

    const total = await this.db
      .select()
      .from(schema.recipes)
      .where(ilike(schema.recipes.name, `%${search}%`));

    return { recipes, total: total.length };
  }

  async findOne(id: number) {
    return this.db.query.recipes.findFirst({
      // for relations
      where: eq(schema.recipes.id, id),
      with: {
        ingredients: true,
        steps: true,
      },
    });
  }

  async findLatest() {
    return this.db
      .select()
      .from(schema.recipes)
      .orderBy(desc(schema.recipes.createdAt))
      .limit(1);
  }

  async findThreeLatest() {
    return this.db
      .select()
      .from(schema.recipes)
      .orderBy(desc(schema.recipes.createdAt))
      .limit(3)
      .offset(1);
  }

  async create(dto: CreateRecipeDto) {
    const exists = await this.db
      .select()
      .from(schema.recipes)
      .where(eq(schema.recipes.name, dto.name));
    if (exists.length > 0) {
      throw new BadRequestException('Recipe already exists');
    }
    return this.db.insert(schema.recipes).values(dto).returning();
  }

  async update(id: number, dto: UpdateRecipeDto) {
    const recipe = await this.db
      .select()
      .from(schema.recipes)
      .where(eq(schema.recipes.id, id));
    if (!recipe.length) {
      throw new NotFoundException('Recipe not found');
    }
    return this.db
      .update(schema.recipes)
      .set(dto)
      .where(eq(schema.recipes.id, id))
      .returning();
  }

  async remove(id: number) {
    const recipe = await this.db
      .select()
      .from(schema.recipes)
      .where(eq(schema.recipes.id, id));
    if (!recipe.length) {
      throw new NotFoundException('Recipe not found');
    }
    return this.db
      .delete(schema.recipes)
      .where(eq(schema.recipes.id, id))
      .returning();
  }
}
