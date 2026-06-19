import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { Ingredient } from './entities/ingredients.entity';
import { Step } from './entities/steps.entity';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    @InjectRepository(Ingredient)
    @InjectRepository(Step)
    private recipesRepository: Repository<Recipe>,
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 8,
    search?: string,
  ): Promise<{ recipes: Recipe[]; total: number }> {
    const [recipes, total] = await this.recipesRepository.findAndCount({
      where: search ? { name: ILike(`%${search}%`) } : {},
      skip: (page - 1) * limit,
      take: limit,
    });
    return { recipes, total };
  }

  async findOne(id: number): Promise<Recipe> {
    const recipe = await this.recipesRepository.findOne({
      where: { id },
      relations: {
        ingredients: true,
        steps: true,
      },
    });
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }
    return recipe;
  }

  async findLatest(): Promise<Recipe> {
    const latest = await this.recipesRepository.findOne({
      order: { id: 'DESC' },
    });
    if (!latest) {
      throw new NotFoundException('Recipe not found');
    }
    return latest;
  }

  async create(dto: CreateRecipeDto): Promise<Recipe> {
    const exists = await this.recipesRepository.findOne({
      where: { name: dto.name },
    });
    if (exists) {
      throw new BadRequestException('Recipe already exists');
    }
    const recipe = this.recipesRepository.create(dto);
    return this.recipesRepository.save(recipe);
  }

  async update(id: number, dto: UpdateRecipeDto): Promise<Recipe> {
    const recipe = await this.recipesRepository.findOne({
      where: { id },
      relations: {
        ingredients: true,
        steps: true,
      },
    });
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }
    Object.assign(recipe, {
      name: dto.name ?? recipe.name,
      cooktime: dto.cooktime ?? recipe.cooktime,
      preptime: dto.preptime ?? recipe.preptime,
      description: dto.description ?? recipe.description,
      image: dto.image ?? recipe.image,
    });

    if (dto.ingredients) {
      recipe.ingredients = dto.ingredients.map((i) => {
        return this.recipesRepository.manager.create(Ingredient, i);
      });
    }

    if (dto.steps) {
      recipe.steps = dto.steps.map((s) => {
        return this.recipesRepository.manager.create(Step, s);
      });
    }

    return this.recipesRepository.save(recipe);
  }

  async remove(id: number): Promise<Recipe> {
    const recipe = await this.recipesRepository.findOne({
      where: { id },
      relations: {
        ingredients: true,
        steps: true,
      },
    });
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }
    return this.recipesRepository.remove(recipe);
  }
}
