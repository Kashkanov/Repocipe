
export function validateTitle(title) {
    return title.length > 0;
}

export function validatePrepTime(prepTime) {
    return prepTime > 0;
}

export function validateCookTime(cookTime) {
    return cookTime > 0;
}

export function validateDescription(description) {
    return description.length > 0;
}

export function validateIngredients(ingredients) {
    return ingredients.length > 0;
}

export function validateInstructions(instructions) {
    return instructions.length > 0;
}



