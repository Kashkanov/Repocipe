import type {Ingredient, Recipe, RecipeMatch, RecipeResponse, RecipeView} from "../types";

const api_url = import.meta.env.VITE_API_URL;

export async function getAllRecipesAndCount(page: number, search: string): Promise<RecipeResponse> {
    console.log(`page ${page} + search: ${search}`);        //<===
    return fetch(api_url + "recipes?page=" + page + "&search=" + search,
        {
            method: "GET",
            credentials: "include",
        })
        .then((res) => res.json());
}

export async function getThreeLatestRecipes(): Promise<RecipeView[]> {
    return fetch(api_url + "recipes/threeLatest/",
        {
            method: "GET",
            credentials: "include",
        })
        .then((res) => res.json());
}

export async function getLatestRecipe(): Promise<RecipeView> {
    return fetch(api_url + "recipes/latest/",
        {
            method: "GET",
            credentials: "include",
        })
        .then((res) => res.json());
}

export async function getRecipeById(id: number): Promise<RecipeView> {
    return fetch(api_url + "recipes/" + id,
        {
            method: "GET",
            credentials: "include",
        })
        .then((res) => res.json());
}

export async function createRecipe(recipe: Recipe): Promise<Recipe> {
    console.log(recipe)
    return fetch(api_url + "recipes",
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recipe),
        })
        .then((res) => res.json());
}

export async function uploadImage(image: FormData) {
    return fetch(api_url + "recipes/upload",
        {
            method: "POST",
            credentials: "include",
            body: image,
        })
        .then((res) => res.json());
}

export async function matchRecipe(ingredients: Ingredient[]): Promise<RecipeMatch[]> {
    return fetch(api_url + "recipes/matchRecipe",
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ingredients),
        })
        .then((res) => {
            console.log(res.status)   //<===
            if(res.status === 204)
                return null
            if(res.ok)
                return res.json()
        })
}
