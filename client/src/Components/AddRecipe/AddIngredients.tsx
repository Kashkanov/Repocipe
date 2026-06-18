import {type FC, useRef, useState} from "react";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons/faCirclePlus";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import type {ingredient} from "../../types/ingredient";
import {motion, AnimatePresence} from "motion/react";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

type AppProps = {
    ingredients: ingredient[];
    setIngredients: React.Dispatch<React.SetStateAction<ingredient[]>>;
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
    const [isIngredientValid, setIsIngredientValid] = useState<boolean>(false);

    const handleAddIngredient = () => {
        const qty = qtyRef.current?.value;
        const unit = unitRef.current?.value;
        const name = nameRef.current?.value;

        let quantity = 0;

        if (qty)
            quantity = parseInt(qty)

        const newIngredient = {
            name: name,
            quantity: quantity,
            unit: unit
        };
        setIngredients([...ingredients, newIngredient]);
        setIngredientCount(ingredientCount + 1);
        clearInputs();
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
        const isQtyEmpty = !qtyRef.current?.value?.trim();
        const isUnitEmpty = !unitRef.current?.value?.trim();
        const isNameEmpty = !nameRef.current?.value?.trim();
        if (isQtyEmpty || isUnitEmpty || isNameEmpty)
            setIsIngredientValid(false);
        else setIsIngredientValid(true);
    }

    return (
        <motion.div
            className="flex flex-col w-full bg-yellow-100 rounded-xl p-5 shadow-lg shadow-gray-900"
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
            <div className="flex justify-start m-5">
                <h2 className="text-3xl"><b>Ingredients</b></h2>
            </div>
            <div className="flex flex-col w-full px-5">
                <AnimatePresence>
                    {/* Existing ingredients */}

                    {ingredients &&
                        ingredients.map((ingredient, index) => (
                            <motion.div
                                key={index}
                                className="relative flex items-center w-full h-25 bg-[#588157] text-white rounded-lg p-10 mb-5 text-xl"
                                initial={{
                                    opacity: 0,
                                    x: -500
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                    transition: {
                                        duration: 0.8,
                                        delay: 0.2
                                    }
                                }}
                                exit={{
                                    opacity: 0,
                                    x: -500,
                                    transition: {
                                        duration: 0.8,
                                        delay: 0.2
                                    }
                                }}
                            >
                                <div className="flex justify-start w-1/6">{ingredient.quantity}</div>
                                <div className="flex justify-start w-1/6">{ingredient.unit}</div>
                                <div className="flex justify-start w-3/6">{ingredient.name}</div>
                                <div className="flex justify-end w-1/6">
                                    <button
                                        type="button"
                                        className="absolute flex justify-center items-center right-[-10px] top-[-10px] w-[3rem] h-[3rem] bg-red-400 hover:bg-red-700 text-white text-sm py-2 px-4 rounded-full"
                                        onClick={() => handleRemoveIngredient(index)}
                                    >
                                        <FontAwesomeIcon icon={faXmark}/>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                </AnimatePresence>
                {/* Add new ingredient */}
                <div className="flex flex-col items-center justify-center w-full h-50 bg-[#dad7cd] text-[#344e41] rounded-lg mb-5 text-xl">
                    <div ref={newIngredientRef} className="relative flex w-full h-4/6">
                        <div className="flex justify-center w-2/12 px-2">
                            <label
                                htmlFor="qtyField"
                                className="flex flex-col justify-center items-center gap-y-2 w-full"
                            >
                                <p>Quantity</p>
                                <input
                                    ref={qtyRef}
                                    id="qtyField"
                                    name="qtyField"
                                    type="number"
                                    onChange={checkIsIngredientValid}
                                    className="w-full h-10 text-black bg-white rounded-md text-xl px-3"
                                />
                            </label>
                        </div>
                        <div className="flex justify-center w-4/12 px-2">
                            <label
                                htmlFor="unitField"
                                className="flex flex-col justify-center items-center gap-y-2 w-full"
                            >
                                <p>Unit</p>
                                <input
                                    ref={unitRef}
                                    id="unitField"
                                    name="unitField"
                                    onChange={checkIsIngredientValid}
                                    className="w-full h-10 text-black bg-white rounded-md text-xl px-3"
                                />
                            </label>
                        </div>
                        <div className="relative flex justify-center w-6/12 px-2">
                            <label
                                htmlFor="nameField"
                                className="flex flex-col justify-center items-center gap-y-2 w-full"
                            >
                                <p>Name</p>
                                <input
                                    ref={nameRef}
                                    id="nameField"
                                    name="nameField"
                                    onChange={checkIsIngredientValid}
                                    className="w-full h-10 text-black bg-white rounded-md text-xl px-3"
                                />
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-center items-center w-full h-2/6">
                        <button
                            type="button"
                            className={`text-white h-10 text-[18px] px-4 rounded ${isIngredientValid ? "bg-[#344e41] hover:bg-[#588157]" : "bg-gray-400 cursor-not-allowed"}`}
                            disabled={!isIngredientValid}
                            onClick={handleAddIngredient}
                        >
                            Add Ingredient <FontAwesomeIcon icon={faCirclePlus}/>
                        </button>
                    </div>
                </div>
                {!isIngredientsValid &&
                    <span className="absolute text-red-600 text-sm bottom-0">Add at least one ingredient</span>
                }
            </div>
        </motion.div>
    )
}

export default AddIngredients;
