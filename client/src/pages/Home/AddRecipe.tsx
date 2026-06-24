import {useEffect, useRef, useState} from "react";
import AddIngredients from "../../Components/AddRecipe/AddIngredients.js";
import AddSteps from "../../Components/AddRecipe/AddSteps.js";
import {useNavigate} from "react-router-dom";
import {
    validateTitle,
    validatePrepTime,
    validateCookTime,
    validateDescription,
    validateIngredients,
    validateInstructions,
} from "../../validation/addRecipeValidation.js";
import {createRecipe, uploadImage} from "../../services/api.js";
import type {Ingredient, Step} from "../../types";
import AddBasicInfo from "../../Components/AddRecipe/AddBasicInfo";

const AddRecipe = () => {

    const navigate = useNavigate();
    const [title, setTitle] = useState<string>("");
    const [prepTime, setPrepTime] = useState<number>(0);
    const [cookTime, setCookTime] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
    const [picture, setPicture] = useState<Blob>();
    const picRef = useRef<HTMLInputElement>(null);
    const picNameRef = useRef<HTMLInputElement>(null);
    const thumbnailRef = useRef<HTMLImageElement>(null);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [ingredientCount, setIngredientCount] = useState<number>(0);
    const [steps, setSteps] = useState<Step[]>([]);
    const [stepCount, setStepCount] = useState<number>(0);
    // const {user} = useAuth();
    const [isTitleValid, setIsTitleValid] = useState<boolean>(true);
    const [isPrepTimeValid, setIsPrepTimeValid] = useState<boolean>(true);
    const [isCookTimeValid, setIsCookTimeValid] = useState<boolean>(true);
    const [isDescriptionValid, setIsDescriptionValid] = useState<boolean>(true);
    const [isIngredientsValid, setIsIngredientsValid] = useState<boolean>(true);
    const [isInstructionsValid, setIsInstructionsValid] = useState<boolean>(true);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.[0];
        if (file) {
            setPicture(file);
        }

        if (file && thumbnailRef.current && picNameRef.current) {
            thumbnailRef.current.src = URL.createObjectURL(file);
            picNameRef.current.value = file.name;
        }
        console.log(file?.name)
    };

    const handleFileRemove = () => {
        if (thumbnailRef.current && picNameRef.current) {
            thumbnailRef.current.src = "/public/assets/placeholderPic.png"
            picNameRef.current.value = "";
        }
    }

    const uploadPic = async () => {
        const imgFormData = new FormData();
        let imgPath;

        if(picture)
            imgFormData.append("image", picture);

        console.log(imgFormData);
        const imgResponse = await uploadImage(imgFormData);

        imgPath = imgResponse.url;
        return imgPath;
    }

    const enumerateSteps = () => {
        steps.forEach((step, index) => {
            step.stepNo = index + 1;
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // send to api

        if(validateForm()) {
            let picPath = "";

            ingredients.forEach((ingredient) => {
                console.log(ingredient);
            })

            if (picture) {
                picPath = await uploadPic();
            }

            enumerateSteps();

            const recipe = {
                name: title,
                preptime: prepTime,
                cooktime: cookTime,
                description: description,
                image: picPath,
                ingredients: ingredients,
                steps: steps,
                // uploader: user?.id,
            }

            const response = await createRecipe(recipe);
            console.log(response);  //<===

            const newRecipe = await response;
            // console.log("new recipe: ", newRecipe)      //<===
            navigate(`/recipes/${newRecipe.id}`);
        }

    }

    const validateForm = () => {
        const titleValidate = validateTitle(title);
        setIsTitleValid(titleValidate);

        const prepTimeValidate = validatePrepTime(prepTime);
        setIsPrepTimeValid(prepTimeValidate);

        const cookTimeValidate = validateCookTime(cookTime);
        setIsCookTimeValid(cookTimeValidate);

        const descriptionValidate = validateDescription(description.length);
        setIsDescriptionValid(descriptionValidate);

        const ingredientsValidate = validateIngredients(ingredients.length);
        setIsIngredientsValid(ingredientsValidate);

        const instructionsValidate = validateInstructions(steps.length);
        setIsInstructionsValid(instructionsValidate);

        return titleValidate && prepTimeValidate && cookTimeValidate && descriptionValidate && ingredientsValidate && instructionsValidate

    }

    useEffect(() => {
        console.log(isTitleValid, isPrepTimeValid, isCookTimeValid, isDescriptionValid, isIngredientsValid, isInstructionsValid);
    }, [isTitleValid, isPrepTimeValid, isCookTimeValid, isDescriptionValid, isIngredientsValid, isInstructionsValid]);


    return (
        <div
            className="relative flex flex-col justify-start items-center w-screen h-dvh bg-gradient-to-bl bg-[#a3b18a] overflow-x-hidden">
            <div className="relative w-3/6 h-[33rem] flex flex-col items-start m-20 text-[#344e41]">
                <h1><strong>Create Recipe</strong></h1>
                <form onSubmit={handleSubmit} className="flex flex-col w-full h-[98rem] pt-5 text-xl gap-y-4">
                    {/* title, prep_time, cook_time, description, picture */}
                    <AddBasicInfo
                        setTitle={setTitle}
                        setPrepTime={setPrepTime}
                        setCookTime={setCookTime}
                        setDescription={setDescription}
                        isTitleValid={isTitleValid}
                        isPrepTimeValid={isPrepTimeValid}
                        isCookTimeValid={isCookTimeValid}
                        isDescriptionValid={isDescriptionValid}
                        thumbnailRef={thumbnailRef}
                        picNameRef={picNameRef}
                        handleFileChange={handleFileChange}
                        handleFileRemove={handleFileRemove}
                        picRef={picRef}
                    />
                    <AddIngredients
                        ingredients={ingredients}
                        setIngredients={setIngredients}
                        ingredientCount={ingredientCount}
                        setIngredientCount={setIngredientCount}
                        isIngredientsValid={isIngredientsValid}
                    />
                    <AddSteps
                        steps={steps}
                        setSteps={setSteps}
                        stepCount={stepCount}
                        setStepCount={setStepCount}
                        isInstructionsValid={isInstructionsValid}
                    />
                    <div className="relative flex justify-end w-full bg-yellow-100 rounded-xl px-5 py-2 gap-5 mb-10 shadow-lg shadow-gray-900">
                        <button
                            type="button"
                            className="w-1/6 text-black h-10 p-1 rounded-sm text-lg hover:underline"
                        >
                            &lt; Back
                        </button>
                        <button
                            type="submit"
                            className={`w-1/6 bg-green-700 hover:bg-green-600 text-white text-lg h-full p-1 rounded-sm cursor-pointer`}
                        >
                            <b>Create</b>
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default AddRecipe;