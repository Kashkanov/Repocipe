
export function validateTitle(title: string) {
    return title.length > 0;
}

export function validatePrepTime(prepTime: number) {
    return prepTime >= 0;
}

export function validateCookTime(cookTime: number) {
    return cookTime >= 0;
}

export function validateDescription(descriptionLength: number) {
    return descriptionLength > 0;
}

export function validateIngredients(ingredientsLength: number) {
    return ingredientsLength > 0;
}

export function validateInstructions(instructionsLength: number) {
    return instructionsLength > 0;
}



