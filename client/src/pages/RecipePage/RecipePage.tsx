import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {motion} from "framer-motion";
import Overview from "../../Components/RecipePage/Overview.js";
import Ingredients from "../../Components/RecipePage/Ingredients.js";
import Steps from "../../Components/RecipePage/Steps.js";
import {getRecipeById} from "../../services/api.js";
import type {Recipe} from "../../types";

const RecipePage = () => {

    const [recipe, setRecipe] = useState<Recipe>();
    const params = useParams();
    const [showFullPic, setShowFullPic] = useState<boolean>(false);

    async function getRecipe() {
        const id = params.id?.toString() || undefined;
        const response = await getRecipeById(id);
        setRecipe(response);
    }

    useEffect(() => {
        getRecipe();
    }, []);

    return (
        <div
            className="relative flex justify-center items-center h-full w-full bg-[#A3B18A]"
        >
            {recipe && (
                <div className="w-4/6 pt-20">
                    <div className="flex flex-col justify-center w-full gap-3">
                        {/*Overview and pic section*/}
                        <div className="flex justify-center w-full gap-3 max-h-110">
                            {/*Overview section*/}
                            <Overview
                                title={recipe.name}
                                prep_time={recipe.preptime}
                                cook_time={recipe.cooktime}
                                description={recipe.description}
                                uploader={recipe.uploader}
                            />
                            {/*Pic section*/}
                            <motion.div
                                initial={{opacity: 0, x: 100}}
                                animate={{opacity: 1, x: 0}}
                                transition={{delay: 0.3, duration: 0.5}}
                                className="flex-col w-2/3 justify-center bg-yellow-100 rounded-lg overflow-hidden"
                            >
                                <button
                                    className="relative w-full h-full bg-blue-400 overflow-hidden"
                                    onClick={() => setShowFullPic(true)}
                                >
                                    <img
                                        src={recipe.image}
                                        alt={recipe.name}
                                        className="w-full max-w-full h-full max-h-full object-cover"
                                    />
                                </button>
                                {/* Full pic modal*/}
                                {showFullPic && (
                                    <button
                                        className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 z-40"
                                        onClick={() => setShowFullPic(false)}
                                    >
                                        <div
                                            className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-100 z-50">
                                            <img
                                                src={recipe.image}
                                                alt={recipe.name}
                                                className="max-w-full max-h-full object-cover"
                                            />
                                        </div>
                                    </button>
                                )}
                            </motion.div>
                        </div>
                        {/*Ingredients section*/}
                        <Ingredients ingredients={recipe.ingredients}/>
                        {/*Instructions section*/}
                        <Steps steps={recipe.steps}/>
                    </div>
                </div>
            )}

        </div>
    )
}

export default RecipePage
