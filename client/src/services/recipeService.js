const api_url = import.meta.env.VITE_API_URL;

export function getAllRecipesAndCount(page, search) {
    console.log(`page ${page} + search: ${search}`);        //<===
    return fetch(api_url + "recipes?page=" + page + "&search=" + search,
        {
            method: "GET",
            credentials: "include",
        })
        .then((res) => res.json());
}

export async function getThreeLatestRecipes() {
    return fetch(api_url + "recipes/threeLatest/",
        {
            method: "GET",
            credentials: "include",
        })
        .then((res) => res.json());
}

export function getLatestRecipe() {
    return fetch(api_url + "recipes/latest/",
        {
            method: "GET",
            credentials: "include",
        })
        .then((res) => res.json());
}

export function getRecipeById(id) {
    return fetch(api_url + "recipes/" + id,
        {
            method: "GET",
            credentials: "include",
        })
        .then((res) => res.json());
}

export function createRecipe(recipe) {
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

export function uploadImage(image) {
    return fetch(api_url + "recipes/uploadImage",
        {
            method: "POST",
            credentials: "include",
            body: image,
        })
        .then((res) => res.json());
}

export function matchRecipe(ingredients) {
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
