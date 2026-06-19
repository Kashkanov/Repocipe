import {type FC, useRef, useState} from "react";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons/faCirclePlus";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import type {Ingredient} from "../../types";
import {motion, AnimatePresence} from "motion/react";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import AddIngredientBox from "./AddIngredients/AddIngredientBox";
import IngredientBox from "./AddIngredients/IngredientBox";

type AppProps = {
    ingredients: Ingredient[];
    setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
    ingredientCount: number,
    setIngredientCount: React.Dispatch<React.SetStateAction<number>>;
    isIngredientsValid: boolean;
}

const AddIngredients: FC<AppProps> = ({
                                          ingredients,
                                          setIngredients,
                                          ingredientCount,
                                          setIngredientCount,
                                          isIngredientsValid
                                      }) => {
    const newIngredientRef = useRef<HTMLDivElement>(null);
    const qtyRef = useRef<HTMLInputElement | null>(null);
    const unitRef = useRef<HTMLInputElement | null>(null);
    const nameRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLInputElement | null>(null);
    const [isIngredientValid, setIsIngredientValid] = useState<boolean>(false);

    const handleAddIngredient = () => {
        if (nameRef.current) {
            const qty = qtyRef.current?.value;
            const unit = unitRef.current?.value;
            const name = nameRef.current.value;
            const description = descriptionRef.current?.value;

            let quantity = qty ? Number(qty) : undefined;

            const newIngredient = {
                name: name,
                qty: quantity,
                unit: unit,
                description: description
            };
            setIngredients([...ingredients, newIngredient]);
            setIngredientCount(ingredientCount + 1);
            clearInputs();
        }
    };

    const clearInputs = () => {
        const inputs = newIngredientRef.current?.querySelectorAll("input");
        inputs?.forEach((input) => (input.value = "")); // clears values
        setIsIngredientValid(false);
    };

    const handleRemoveIngredient = (index: number) => {
        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1);
        setIngredients(newIngredients);
    }

    const checkIsIngredientValid = () => {
        const isNameEmpty = !nameRef.current?.value?.trim();
        if (isNameEmpty)
            setIsIngredientValid(false);
        else setIsIngredientValid(true);
    }

    return (
        <motion.div
            className="flex flex-col w-full bg-yellow-100 rounded-xl p-1 shadow-lg shadow-gray-900"
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
                delay: 0.2
            }}
        >
            <div className="flex items-center justify-start mb-1 mx-5 gap-1">
                <h2 className="text-xl"><b>Ingredients</b></h2>
                {!isIngredientsValid &&
                    <span className="text-red-600 text-sm italic">Add at least one ingredient</span>
                }
            </div>
            <div className="flex flex-col w-full px-5">
                <AnimatePresence>
                    {/* Existing ingredients */}

                    {ingredients &&
                        ingredients.map((ingredient, index) => (
                            <IngredientBox
                                key={index}
                                ingredient={ingredient}
                                index={index}
                                handleRemoveIngredient={handleRemoveIngredient}
                            />
                        ))}
                </AnimatePresence>
                {/* Add new ingredient */}
                <AddIngredientBox
                    newIngredientRef={newIngredientRef}
                    qtyRef={qtyRef}
                    checkIsIngredientValid={checkIsIngredientValid}
                    handleAddIngredient={handleAddIngredient}
                    isIngredientValid={isIngredientValid}
                    unitRef={unitRef}
                    nameRef={nameRef}
                    descriptionRef={descriptionRef}
                />

            </div>
        </motion.div>
    )
}

export default AddIngredients;
