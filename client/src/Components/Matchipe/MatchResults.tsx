import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowsRotate} from "@fortawesome/free-solid-svg-icons/faArrowsRotate";
import type {recipeMatch} from "../../types/recipeMatch";
import type {FC} from "react";
import {motion} from "framer-motion";

type AppProps = {
    matchedRecipes: recipeMatch[];
    topMatchedRecipe: recipeMatch | null;
    setMatchedRecipes: React.Dispatch<React.SetStateAction<recipeMatch[]>>;
    setTopMatchedRecipe: React.Dispatch<React.SetStateAction<recipeMatch | null>>;
    setIngredients: React.Dispatch<React.SetStateAction<string[]>>;
}

const MatchResults: FC<AppProps> = ({
                                        matchedRecipes,
                                        topMatchedRecipe,
                                        setMatchedRecipes,
                                        setTopMatchedRecipe,
                                        setIngredients
                                    }) => {

    function clearAll() {
        setMatchedRecipes([])
        setTopMatchedRecipe(null)
        setIngredients([])
    }

    return (
        <div
            className="relative flex flex-col items-center justify-center bg-[#3a5a40] w-4/6 h-5/6 mt-25 rounded-xl gap-2 p-5 shadow-lg shadow-gray-800">
            <div className="flex w-full h-1/6 justify-between items-center">
                <h1 className="text-3xl text-white"><strong>Results</strong></h1>
                <button
                    className="text-2xl cursor-pointer"
                    type="button"
                    onClick={() => clearAll()}
                >
                    Retry&nbsp;<FontAwesomeIcon icon={faArrowsRotate}/>
                </button>
            </div>
            <div className="flex w-full h-5/6 justify-center p-2">
                <motion.div
                    className="relative flex flex-col justify-end items-center w-4/6 h-full"
                    whileHover="hover"
                >
                    <motion.div
                        className="absolute flex top-0 justify-center items-center h-1/6 bg-white text-2xl text-black z-10 p-5 text-mogra gap-2 rounded shadow-lg"
                        initial={{
                            scale: 1,
                            rotate: 0
                        }}
                        variants={{
                            hover: {
                                scale: [1, 1.2, 1.2, 1.2, 1.2, 1.2, 1],
                                rotate: [0, 0, -5, 5, -5, 5, 0],
                                transition:{
                                    duration: 3,
                                    times: [0, 0.1, 0.5, 0.52, 0.54, 0.56, 0.58, 1],
                                    repeat: Infinity,
                                    repeatDelay: 1
                                }
                            }
                        }}
                    >
                        <span>Best Match</span>
                        <div className="h-full flex items-start pb-13">
                            <img src="../../../public/icons/thumbs-up.png" alt="like" className="w-8 h-8"/>
                        </div>
                    </motion.div>
                    {topMatchedRecipe &&
                        <div
                            className="relative flex flex-col justify-between items-center w-full h-11/12 rounded-lg overflow-hidden">
                            <a
                                href={`/Recipes/${topMatchedRecipe["recipe"]?._id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full h-full"
                            >
                                <div className="relative flex flex-col w-full h-full justify-between items-center">
                                    <img className="w-full h-full object-cover" src={topMatchedRecipe?.recipe.picture}
                                         alt="recipe"/>
                                    <motion.div
                                        className="absolute bottom-5 w-[100px] h-[100px] bg-[#FEF9C3] z-10 rotate-45"
                                        variants={{
                                            hover:{
                                                backgroundColor: "#ffffff"
                                            }
                                        }}
                                    >
                                    </motion.div>
                                    <motion.div
                                        className="absolute flex justify-center items-center bottom-0 text-2xl h-[70px] w-full text-black bg-[#FEF9C3] z-10"
                                        variants={{
                                            hover:{
                                                backgroundColor: "#ffffff"
                                            }
                                        }}
                                    >
                                        {topMatchedRecipe?.recipe.title} - <strong>{topMatchedRecipe && (topMatchedRecipe["score"] * 100).toFixed(2)}%</strong>
                                    </motion.div>
                                </div>
                            </a>
                        </div>
                    }
                </motion.div>
                <div className="relative flex flex-col justify-end items-center w-3/6 h-full pl-3">
                    <div className="relative flex flex-col w-full h-11/12 gap-y-2">
                        {matchedRecipes && matchedRecipes.map((recipe, index) => {
                            const count = index + 2;
                            return (
                                <motion.div
                                    key={recipe.recipe._id}
                                    className="h-1/4 w-full bg-[#FEF9C3] rounded-lg text-black text-xl p-5"
                                    whileHover={{
                                        backgroundColor: "#ffffff"
                                    }}
                                >
                                    <a
                                        href={`/Recipes/${recipe['recipe']?._id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex justify-between items-center  w-full h-full"
                                    >
                                        <span className="text-mogra">{count}</span>
                                        <span className="">{recipe.recipe.title}</span>
                                        <span className="">{recipe["score"] * 100}% <strong><i>Match</i></strong></span>
                                    </a>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MatchResults;