import {useEffect, useState} from "react";
import {motion} from "motion/react";
import {Link} from "react-router-dom";
import {getThreeLatestRecipes, getLatestRecipe} from "../../services/recipeService.js";
import type {recipe} from "../../types/recipe";

const Showcase = () => {


    const [sampRecipes, setSampRecipes] = useState<recipe[]>([]);
    const [newestRecipe, setNewestRecipe] = useState<recipe>();

    async function ThreeLatestRecipes() {
        const response = await getThreeLatestRecipes();
        setSampRecipes(response);
    }

    async function LatestRecipe() {
        const response = await getLatestRecipe();
        setNewestRecipe(response);
    }

    useEffect(() => {
        ThreeLatestRecipes();
        LatestRecipe();
    }, []);


    return (
        <div className="relative flex flex-col items-center bg-[#DAD7CD] w-full h-screen overflow-x-hidden">
            <h1 className="mt-13 text-5xl text-[#344e41] font-bold py-5">Watcha cookin today?</h1>
            {sampRecipes.length > 0 &&
                (
                    <div className="w-full h-3/4 flex overflow-x-hidden px-10">
                        <motion.div
                            className="w-1/2 h-full p-3"
                            initial={{
                                opacity: 0,
                                x: -100
                            }}
                            animate={{
                                opacity: 1,
                                x:0
                            }}
                            transition={{
                                duration: 0.5,
                            }}
                        >
                            <Link to={`/Recipes/${newestRecipe?._id}`}>
                                <motion.div
                                    className="relative w-full max-w-full h-full bg-gray-700 rounded-xl shadow-lg overflow-hidden cursor-pointer"
                                    initial={{scale: 1}}
                                    whileHover="hover"
                                >
                                    <img
                                        src={newestRecipe?.picture}
                                        alt={newestRecipe?.title}
                                        className="w-full h-full object-cover"
                                    />
                                    {/*Overlay pull-down on hover*/}
                                    <motion.div
                                        className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-[#588157] opacity-80"
                                        initial={{y: -1000}}
                                        variants={{
                                            hover: {
                                                y: 0,
                                                transition: {type: "tween", duration: 0.5, ease: "easeOut"}
                                            },
                                        }}
                                    >
                                        <div className="flex-col justify-center w-full h-44">
                                            <h1 className="text-5xl font-bold">{newestRecipe?.title}</h1>
                                            <p className="pt-5 mx-5">{newestRecipe?.description}</p>
                                            <div className="flex justify-center items-center w-full mt-5">
                                                <div className="flex-col w-1/2 justify-center">
                                                    <p className="text-5xl">🔪</p>
                                                    <h2 className="text-3xl">
                                                        <strong>{newestRecipe?.prep_time}</strong> mins</h2>
                                                    <p>Prep Time</p>
                                                </div>
                                                <div className="flex-col w-1/2 justify-center">
                                                    <p className="text-5xl">🍳</p>
                                                    <h2 className="text-3xl">
                                                        <strong>{newestRecipe?.cook_time}</strong> mins</h2>
                                                    <p>Cook Time</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </Link>
                        </motion.div>
                        <div className="w-1/2 h-full flex gap-3 overflow-hidden">
                            <motion.div
                                className="relative w-full h-full flex flex-wrap"
                                initial={{
                                    opacity: 0,
                                    y: 100
                                }}
                                animate={{
                                    opacity: 1,
                                    y:0
                                }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.5,
                                }}
                            >
                                {
                                    sampRecipes.map((recipe) => {
                                        return (
                                            <div
                                                key={recipe._id}
                                                className="w-1/2 h-1/2 p-3"
                                            >
                                                <Link to={`/Recipes/${recipe._id}`}>
                                                    <motion.div
                                                        className="relative w-full h-full bg-gray-700 rounded-xl shadow-lg overflow-hidden cursor-pointer"
                                                        initial={{scale: 1}}
                                                        whileHover="hover"
                                                    >
                                                        <img
                                                            src={recipe.picture}
                                                            alt={recipe.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <motion.div
                                                            className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-[#588157] opacity-80"
                                                            initial={{y: -800}}
                                                            variants={{
                                                                hover: {
                                                                    y: 0,
                                                                    transition: {
                                                                        type: "tween",
                                                                        duration: 0.5,
                                                                        ease: "easeOut"
                                                                    }
                                                                },
                                                            }}
                                                        >
                                                            <div className="flex-col justify-center w-full h-44">
                                                                <h2 className="text-2xl font-bold">{recipe.title}</h2>
                                                                <div
                                                                    className="flex justify-center items-center w-full mt-5">
                                                                    <div className="flex-col w-1/2 justify-center">
                                                                        <p className="text-xl">🔪</p>
                                                                        <h2 className="text-lg">
                                                                            <strong>{recipe.prep_time}</strong> mins
                                                                        </h2>
                                                                        <p>Prep Time</p>
                                                                    </div>
                                                                    <div className="flex-col w-1/2 justify-center">
                                                                        <p className="text-xl">🍳</p>
                                                                        <h2 className="text-lg">
                                                                            <strong>{recipe.cook_time}</strong> mins
                                                                        </h2>
                                                                        <p>Cook Time</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    </motion.div>
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                                <Link to="/recipes" className="absolute bottom-0 right-0 w-1/2 h-1/2 p-3">
                                    <motion.div
                                        className="flex flex-col justify-center items-center w-full h-full  rounded-xl shadow-lg cursor-pointer"
                                        initial={{backgroundColor: "#464646"}}
                                        whileHover={{
                                            backgroundColor: "#ffffff",
                                            color: "black",
                                        }}
                                        transition={{duration: 2, ease: "easeOut"}}
                                    >
                                        <h2 className="text-lg">See more recipes</h2>
                                    </motion.div>
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Showcase;