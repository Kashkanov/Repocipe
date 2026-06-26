import type {Ingredient, Recipe, RecipeMatch, RecipeResponse, RecipeView} from "../types";
import axios from "axios";

const api_url = import.meta.env.VITE_API_URL;

const publicApi = axios.create({
    baseURL: api_url,
    withCredentials: true
})

const privateApi = axios.create({
    baseURL: api_url,
    withCredentials: true
})

// ------------------ AUTH ------------------

privateApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
})

export const login = async (username: string, password: string) => publicApi.post("/auth-v2/login", {
    username,
    password
})

export const register = async (username: string, password: string) => publicApi.post("/auth-v2/register", {
    username,
    password
})

export const getUser = async () => privateApi.get("/auth-v2/me");

export const logout = async () => privateApi.post("/auth-v2/logout");

// ------------------ RECIPES ------------------

export const getAllRecipesAndCount = async (page: number, search: string) => publicApi.get(`/recipes?page=${page}&search=${search}`)

export const getThreeLatestRecipes = async () => publicApi.get("/recipes/threeLatest");

export const getLatestRecipe = async () => publicApi.get("/recipes/latest");

export const getRecipeById = async (id: number) => publicApi.get(`/recipes/${id}`);

export const createRecipe = async (recipe: Recipe) => privateApi.post("/recipes", recipe);

export const uploadImage = async (image: FormData) => privateApi.post("/recipes/upload", image);

export const matchRecipe = async (ingredients: Ingredient[]) => privateApi.post("/recipes/matchRecipe", ingredients);
