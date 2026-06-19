export interface Ingredient {
    qty: number | undefined;
    unit: string | undefined;
    name: string;
    description: string | undefined;
}

export interface Step {
    stepNo?: number;
    description: string;
}

export interface Recipe {
    id?: number;
    name: string;
    preptime: number;
    cooktime: number;
    image?: string;
    description: string;
    ingredients: Ingredient[];
    steps: Step[];
    datetime_added?: Date;
    uploader?: string;
}

export interface RecipeResponse {
    recipes: Recipe[];
    total: number;
}

export interface RecipeMatch {
    score: number | 0;
    recipe: Recipe;
}

export interface User {
    id: string;
    name: string;
}