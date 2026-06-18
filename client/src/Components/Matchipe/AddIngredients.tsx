import {faCirclePlus} from "@fortawesome/free-solid-svg-icons/faCirclePlus";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {type FC, useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import {AnimatePresence} from "motion/react";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

type AppProps = {
    ingredients: string[];
    setIngredients: React.Dispatch<React.SetStateAction<string[]>>;
    handleSubmitIngredients: (ingredients: React.FormEvent<HTMLFormElement>) => Promise<void>;
    isValidIngredients: boolean;
};

const AddIngredients: FC<AppProps> = ({ingredients, setIngredients, handleSubmitIngredients, isValidIngredients}) => {

    const [currIngredient, setCurrIngredient] = useState("");
    const ingRef = useRef<HTMLInputElement>(null);

    const handleAddIngredient = () => {
        setIngredients([...ingredients, currIngredient]);
        if (ingRef.current)
            ingRef.current.value = "";
        setCurrIngredient("");
    }

    const totalDuration = 7.2;
    const transitionDuration = 0.2;

    useEffect(() => {
        console.log("currIngredient: ", currIngredient)      //<===
    }, [currIngredient]);

    return (
        <motion.form
            className="relative flex items-center justify-center w-5/6 h-5/6 mt-25 gap-2"
            onSubmit={handleSubmitIngredients}
        >
            <AnimatePresence>
                <motion.div
                    className="relative flex flex-col justify-center items-center w-2/6 h-full z-20 gap-y-2"
                    initial={{
                        opacity: 0,
                        x: -100,
                    }}
                    animate={{

                        opacity: 1,
                        x: 0
                        // x: [0, 0, -100, -100, 0]
                    }}
                    transition={{
                        type: "spring",
                        ease: "easeIn",
                        bounce: 0,
                        duration: 1

                    }}
                >
                    <div
                        className="flex flex-col h-5/6 bg-[#978D84] rounded-lg gap-y-2 shadow-md shadow-gray-600 overflow-hidden">
                        <img
                            className="h-1/2 w-full object-cover"
                            src="../../../public/assets/matchipe_div.webp"
                            alt="Matchipe_stock"
                        />
                        <span className="text-black text-4xl"><strong><i>Matchipe&#8482;</i></strong></span>
                        <span className="px-10">
                            Have all the ingredients but don’t know what to make? Worry not! Matchipe™ is the solution
                            for
                            you!
                            All you have to do is type in all the
                            ingredients available in you kitchen.
                        </span>
                        <span
                            className="text-red-700"><strong>Important: Make sure the spelling is correct.</strong></span>
                        <div className="w-full h-1/12">
                            {!isValidIngredients &&
                                <span className="text-red-400">Ingredients cannot be empty.</span>
                            }
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="relative flex justify-center items-center h-1/6 w-full bg-[#588157] hover:bg-[#7CBF7C] text-3xl py-3 px-5 shadow-lg shadow-gray-600 cursor-pointer"
                    >
                        Match!
                    </button>
                </motion.div>
                <motion.img
                    className="absolute w-[250px] h-[250px] left-4/12 z-10"
                    src="../../../public/assets/surprise.jpg"
                    alt="secret"

                    animate={{
                        scale: [0, 0, 1, 1, 0]
                    }}
                    transition={{
                        type: "keyframes",
                        duration: 7,
                        times: [0, 5 / totalDuration, (5 + transitionDuration) / totalDuration, 7 / totalDuration, (7 + transitionDuration) / totalDuration],
                        repeat: 6,
                        ease: ["linear", "easeOut", "linear", "easeOut"]
                    }}

                />

                <motion.div
                    className="relative flex flex-col w-3/6 h-full bg-[#FEF9C3] rounded-lg py-5 px-10 shadow-md z-20 shadow-gray-600"
                    initial={{
                        opacity: 0,
                        x: 100
                    }}
                    animate={{
                        opacity: 1,
                        x: 0
                        // x: [0, 0, 100, 100, 0]
                    }}
                    transition={{
                        type: "spring",
                        ease: "easeIn",
                        bounce: 0,
                        duration: 1,
                        delay: 0.5
                        // type: "keyframes",
                        // duration: 7,
                        // times: [0, 5 / totalDuration, (5 + transitionDuration) / totalDuration, 7 / totalDuration, (7 + transitionDuration) / totalDuration], // [Start time, Time for x=100, End time]
                        // repeat: 6,
                        // ease: ["linear", "easeOut", "linear", "easeOut"],
                    }}
                >
                    <div className="text-2xl flex justify-start w-full">
                        <h2 className="text-black"><strong>Ingredients</strong></h2>
                    </div>
                    <div className="relative w-full h-full flex flex-col justify-between mt-5">
                        {/* Ingredients list */}
                        <div className="flex-[1_1_0] overflow-y-auto">
                            {ingredients.map((ingredient, index) => (
                                <div
                                    key={index}
                                    className="relative w-full h-[5rem] flex flex-row justify-between items-center bg-[#588157] rounded-lg px-5 mb-1"
                                >
                                    <span className="text-xl">{ingredient}</span>
                                    <button
                                        className="flex justify-center items-center right-[-10px] top-[-10px] w-[3rem] h-[3rem] hover:bg-red-700 text-white text-sm "
                                        type="button"
                                        onClick={() =>
                                            setIngredients(ingredients.filter((_, i) => i !== index))
                                        }
                                    >
                                        <FontAwesomeIcon icon={faXmark}/>
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Add new ingredient box */}
                        <div
                            className="w-full flex flex-col justify-between items-center bg-[#D9D9D9] rounded-lg py-2 mt-2 gap-y-2">
                            <div className="w-full">
                                <span className="text-black text-lg">Type ingredient</span>
                            </div>
                            <div className="flex w-full justify-center align-center px-2 gap-1">
                                <div className="flex w-10/12 bg-blue-200">
                                    <input
                                        ref={ingRef}
                                        className="w-full h-10 bg-white rounded-sm text-black px-2 text-lg"
                                        type="text"
                                        name="name"
                                        onChange={e => setCurrIngredient(e.target.value)}
                                    />
                                </div>
                                <div className="w-2/12 flex justify-center">
                                    <button
                                        className={`relative h-10 w-full flex justify-center items-center text-lg rounded-sm px-2 ${currIngredient ? ' bg-blue-500 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'}`}
                                        type="button"
                                        onClick={handleAddIngredient}
                                        disabled={!currIngredient}
                                    >
                                        <FontAwesomeIcon icon={faCirclePlus}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </motion.form>
    )
}

export default AddIngredients;