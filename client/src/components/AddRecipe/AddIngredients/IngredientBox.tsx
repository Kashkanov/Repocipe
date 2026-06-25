import type {FC} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {motion} from "motion/react";
import type {Ingredient} from "../../../types";

interface IngredientBoxProps {
    ingredient: Ingredient;
    index: number;
    handleRemoveIngredient: (index: number) => void;
}

const IngredientBox: FC<IngredientBoxProps> = ({ ingredient, index, handleRemoveIngredient }) => {
    return (
        <motion.div
            className="relative flex items-center w-full h-10 bg-[#588157] text-white rounded-lg pl-5 mb-2 text-sm"
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
            <div className="flex justify-start items-center w-11/12 h-full">
                &#9679; {ingredient.qty || ""} {ingredient.unit} {ingredient.name}
                {ingredient.description &&
                    <i>,&nbsp;{ingredient.description}</i>
                }
            </div>
            <div className="flex justify-end w-1/12">
                <button
                    type="button"
                    className="flex justify-center items-center w-[1rem] h-[1rem] py-2 px-4 rounded-full cursor-pointer"
                    onClick={() => handleRemoveIngredient(index)}
                >
                    <FontAwesomeIcon icon={faXmark}/>
                </button>
            </div>
        </motion.div>
    )
}

export default IngredientBox