import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {motion} from "framer-motion";
import {type FC, useState} from "react";
import type {ingredient} from "../../types/ingredient";

type AppProps = {
    ingredients: ingredient[];
}

const Ingredients: FC<AppProps> = ({ingredients}) => {

    const [servings, setServings] = useState<number>(1);
    const [checkedItems, setCheckedItems] = useState<number[]>([]);

    // Function to toggle the checked state of an item from the list
    const toggleCheck = (index: number) => {
        if (checkedItems.includes(index)) {
            setCheckedItems(checkedItems.filter((item) => item !== index));
        } else {
            setCheckedItems([...checkedItems, index]);
        }
    };


    return (

        <motion.div
            initial={{opacity: 0, y: 100}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.5, duration: 0.5}}
            className="flex-col text-start bg-yellow-100 rounded-lg text-black p-5 w-full"
        >
            <div className="flex justify-between">
                <span className="text-2xl font-bold pb-5">Ingredients</span>
                {/* Servings adjust */}
                <div className="flex flex-col h-10 w-30 ">
                    <div className="relative flex justify-center items-center h-1/2 w-full font-bold">
                        <button
                            onClick={() => setServings(servings - 1)}
                            disabled={servings === 1}
                            className="relative bg-gray-300 h-full w-1/6 rounded-tl-xl rounded-bl-xl flex justify-center items-center cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faMinus}/>
                        </button>
                        <input
                            type="number"
                            className="flex h-full w-3/6 text-center bg-white "
                            value={servings}
                            onChange={(e) => setServings(parseInt(e.target?.value))}
                        />
                        <button
                            onClick={() => setServings(servings + 1)}
                            className="relative bg-gray-300 h-full w-1/6 rounded-tr-xl rounded-br-xl flex justify-center items-center cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faPlus}/>
                        </button>
                    </div>
                    <span className="text-center text-black w-full">Servings</span>
                </div>
            </div>
            {ingredients &&
                (
                    <div className="w-full">
                        {ingredients.map((ingredient, index) => {
                            const isChecked = checkedItems.includes(index);
                            return (
                                <div
                                    key={index}
                                    className="relative flex text-lg items-center p-2"
                                >
                                    <input
                                        type="checkbox"
                                        id={`ingredient-${index}`}
                                        value={index}
                                        checked={isChecked}
                                        onChange={() => toggleCheck(index)}
                                    />
                                    <div className="relative">
                                        <label
                                            htmlFor={`ingredient-${index}`}
                                            className="ml-5"
                                        >
                                            {ingredient.quantity * servings} {ingredient.unit} {ingredient.name}
                                            <motion.span
                                                initial={false}
                                                animate={{width: isChecked ? "100%" : "0%"}}
                                                transition={{duration: 0.3}}
                                                className="absolute left-5 top-1/2 h-[2px] bg-black"
                                            />
                                        </label>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )
            }
        </motion.div>
    )
}

export default Ingredients;
