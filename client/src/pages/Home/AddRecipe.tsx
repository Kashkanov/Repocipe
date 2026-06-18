import { useRef, useState} from "react";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {motion} from "framer-motion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AddIngredients from "../../Components/AddRecipe/AddIngredients.js";
import AddSteps from "../../Components/AddRecipe/AddSteps.js";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../Contexts/AuthContext.js";
import {
    validateTitle,
    validatePrepTime,
    validateCookTime,
    validateDescription,
    validateIngredients,
    validateInstructions,
} from "../../validation/addRecipeValidation.js";
import {createRecipe, uploadImage} from "../../services/recipeService.js";
import type {ingredient} from "../../types/ingredient";

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
    const [ingredients, setIngredients] = useState<ingredient[]>([]);
    const [ingredientCount, setIngredientCount] = useState<number>(0);
    const [steps, setSteps] = useState<string[]>([]);
    const [stepCount, setStepCount] = useState<number>(0);
    const {user} = useAuth();
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
        const picFormData = new FormData();
        let picPath;

        if(picture)
            picFormData.append("picture", picture);

        const picResponse = await uploadImage(picFormData);

        picPath = picResponse.url;
        return picPath;
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

            const recipe = {
                title: title,
                prep_time: prepTime,
                cook_time: cookTime,
                description: description,
                picture: picPath,
                ingredients: ingredients,
                steps: steps,
                uploader: user?.id,
            }

            const response = await createRecipe(recipe);
            console.log(response);  //<===

            const newRecipe = await response.recipe;
            // console.log("new recipe: ", newRecipe)      //<===
            navigate(`/recipes/${newRecipe._id}`);
        }

    }

    const validateForm = () => {
        const titleValidate = validateTitle(title);
        setIsTitleValid(titleValidate);

        const prepTimeValidate = validatePrepTime(prepTime);
        setIsPrepTimeValid(prepTimeValidate);

        const cookTimeValidate = validateCookTime(cookTime);
        setIsCookTimeValid(cookTimeValidate);

        const descriptionValidate = validateDescription(description);
        setIsDescriptionValid(descriptionValidate);

        const ingredientsValidate = validateIngredients(ingredients);
        setIsIngredientsValid(ingredientsValidate);

        const instructionsValidate = validateInstructions(steps);
        setIsInstructionsValid(instructionsValidate);

        return titleValidate && prepTimeValidate && cookTimeValidate && descriptionValidate && ingredientsValidate && instructionsValidate

    }


    return (
        <div
            className="relative flex flex-col justify-start items-center w-screen h-dvh bg-gradient-to-bl bg-[#a3b18a] overflow-x-hidden">
            <div className="relative w-3/6 h-[33rem] flex flex-col items-start m-20 text-[#344e41]">
                <h1><strong>Create Recipe</strong></h1>
                <form onSubmit={handleSubmit} className="flex flex-col w-full h-[98rem] pt-5 text-xl gap-y-4">
                    {/* title, prep_time, cook_time, description, picture */}
                    <motion.div
                        className="flex w-full h-full bg-yellow-100 rounded-xl p-5 shadow-lg shadow-gray-900"
                        initial={{
                            opacity: 0,
                            scale: 0.8,
                            y: 100
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0
                        }}
                        transition={{
                            duration: 0.3,
                        }}
                    >
                        {/* title, prep_time, cook_time, description */}
                        <div className="flex flex-col w-1/2 h-full pr-5 gap-y-2">
                            {/* title */}
                            <label
                                className="relative flex flex-col items-start p-2"
                                htmlFor="title"
                            >
                                <p>Title</p>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    autoComplete="on"
                                    onChange={(e) => setTitle(e.target.value)}
                                    // onBlur={(e) => setIsTitleValid(validateTitle(e.target.value))}
                                    className="w-full rounded-md bg-white p-1"
                                />
                                {!isTitleValid &&
                                    <span
                                        className="absolute text-red-600 text-sm bottom-[-1rem]">Cannot be empty<b></b></span>
                                }
                            </label>
                            {/* prep_time, cook_time */}
                            <div className="flex w-full items-start px-2">
                                {/* prep_time */}
                                <label
                                    className="flex flex-col items-start"
                                    htmlFor="prep_time"
                                >
                                    <p>Prep Time </p>
                                    <div className="relative flex justify-start items-center">
                                        <input
                                            type="number"
                                            id="prep_time"
                                            name="prep_time"
                                            autoComplete="on"
                                            onChange={(e) => setPrepTime(parseInt(e.target.value))}
                                            className="w-1/4 rounded-md bg-white p-1"
                                        /> &nbsp; <span className="text-sm"><strong>mins</strong></span>
                                        {!isPrepTimeValid &&
                                            <span className="absolute text-red-600 text-sm bottom-[-1.4rem]">Must be more than 0</span>
                                        }
                                    </div>
                                </label>
                                {/* cook_time */}
                                <label
                                    className="flex flex-col items-start"
                                    htmlFor="prep_time"
                                >
                                    <p>Cook Time</p>
                                    <div className="relative flex justify-start items-center">
                                        <input
                                            type="number"
                                            id="cook_time"
                                            name="cook_time"
                                            autoComplete="on"
                                            onChange={(e) => setCookTime(parseInt(e.target.value))}
                                            // onBlur={(e) => setIsCookTimeValid(validateCookTime(e.target.value))}
                                            className="w-1/4 rounded-md bg-white p-1"
                                        /> &nbsp; <span className="text-sm"><strong>mins</strong></span>
                                        {!isCookTimeValid &&
                                            <span className="absolute text-red-600 text-sm bottom-[-1.4rem]">Must be more than 0</span>
                                        }
                                    </div>
                                </label>

                            </div>
                            {/* description */}
                            <label
                                className="relative flex flex-col items-start p-2 h-full"
                                htmlFor="description"
                            >
                                <p>Description</p>
                                <textarea
                                    id="description"
                                    name="description"
                                    autoComplete="on"
                                    onChange={(e) => setDescription(e.target.value)}
                                    // onBlur={(e) => setIsDescriptionValid(validateDescription(e.target.value))}
                                    className="w-full h-48 rounded-md bg-white p-1 resize-none"
                                />
                                {!isDescriptionValid &&
                                    <span className="absolute text-red-600 text-sm bottom-[-1rem]">Cannot be empty<b></b></span>
                                }

                            </label>
                        </div>

                        {/* picture */}
                        <div className="flex flex-col items-center w-1/2 h-full pl-5">
                            <label
                                className="flex flex-col w-full h-full items-start"
                                htmlFor="image"
                            >
                                <p>Image</p>
                                <div
                                    className="relative flex justify-center w-full max-w-full h-11/12 max-h-full bg-black overflow-hidden mb-5">
                                    <img
                                        className="object-cover"
                                        src="../../../public/assets/placeholderPic.png"
                                        ref={thumbnailRef}
                                        alt=""
                                    />
                                </div>
                                <div className="flex w-full h-1/12 justify-start items-center gap-2">
                                    <button
                                        type="button"
                                        className="border bg-blue-400 w-3/12 text-white text-sm h-full p-1 rounded-md"
                                        onClick={() => picRef.current?.click()}
                                    >
                                        Upload
                                    </button>
                                    <input
                                        type="file"
                                        id="pic"
                                        accept="image/*"
                                        ref={picRef}
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    <input
                                        type="text"
                                        id="picture"
                                        ref={picNameRef}
                                        name="picture"
                                        className="w-7/12 h-full rounded-md bg-white p-1 cursor-not-allowed"
                                        readOnly
                                    />
                                    <button
                                        type="button"
                                        className="relative flex justify-center items-center border bg-red-400 w-3/12 text-white h-full rounded-md"
                                        onClick={handleFileRemove}
                                    >
                                        <FontAwesomeIcon
                                            className="fa-xs"
                                            icon={faTrash}
                                        />
                                    </button>
                                </div>
                            </label>
                        </div>
                    </motion.div>
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
                    <div className="relative flex justify-end w-full bg-yellow-100 rounded-xl px-10 py-2 gap-5 mb-10 shadow-lg shadow-gray-900">
                        <button
                            type="button"
                            className="w-1/6 text-black h-15 p-1 rounded-md text-lg hover:underline"
                            // onClick={handleCreateRecipe}
                        >
                            &lt; Back
                        </button>
                        <button
                            type="submit"
                            className={`w-1/6 bg-green-400 hover:bg-green-600 text-white text-2xl h-full p-1 rounded-md cursor-pointer`}
                            // onClick={handleCreateRecipe}
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