import type {Ingredient, Recipe, RecipeMatch, RecipeResponse, RecipeView} from "../types";
import axios from "axios";

const api_url = import.meta.env.VITE_API_URL;

export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post(api_url + "auth-v2/login",
            {
                username,
                password
            })
        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}

export const register = async(username: string, password: string) => {
    try {
        const response = await axios.post(api_url + "auth-v2/register",
            {
                username,
                password
            });
        return response.data;
    }   catch (e) {
        console.error("Register error:", e);
        throw e;
    }
}

export const logout = async() => {
    try{
        const response = await axios.post(api_url + "auth-v2/logout");
        return response.data;
    } catch (error) {
        console.error("Logout error:", error);
        throw error;
    }
}

export const getAllRecipesAndCount = async (page: number, search: string): Promise<RecipeResponse> => {
    const response = await axios.get<RecipeResponse>(api_url + "recipes?page=" + page + "&search=" + search,
        {
            method: "GET"
        })
        .then((res) => res.data);
    return response;
}

export const getThreeLatestRecipes = async (): Promise<RecipeView[]> => {
    const response = await axios.get<RecipeView[]>(api_url + "recipes/threeLatest",
        {
            method: "GET"
        })
        .then((res) => res.data);
    return response;
}


export const getLatestRecipe = async (): Promise<RecipeView> => {
    const response = await axios.get<RecipeView>(api_url + "recipes/latest",
        {
            method: "GET"
        })
        .then((res) => res.data);
    return response;
}


export const getRecipeById = async (id: number): Promise<RecipeView> => {
    const response = await axios.get<RecipeView>(api_url + "recipes/" + id,
        {
            method: "GET"
        })
        .then((res) => res.data);
    return response;
}


export const createRecipe = async (recipe: Recipe): Promise<Recipe> => {
    const response = await axios.post<Recipe>(api_url + "recipes",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recipe),
        })
        .then((res) => res.data);
    return response;
}

// export async function uploadImage(image: FormData) {
//     return fetch(api_url + "recipes/upload",
//         {
//             method: "POST",
//             credentials: "include",
//             body: image,
//         })
//         .then((res) => res.json());
// }

export const uploadImage = async (image: FormData) => {
    const response = await axios.post(api_url + "recipes/upload",
        {
            method: "POST",
            credentials: "include",
            body: image,
        })
        .then((res) => res.data);
    return response;
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
            if (res.status === 204)
                return null
            if (res.ok)
                return res.json()
        })
}
