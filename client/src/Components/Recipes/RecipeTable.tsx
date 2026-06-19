import RecipeCard from "./RecipeCard.js";
import {type FC} from "react";
import type {Recipe} from "../../types";
import {motion} from "motion/react";

type AppProps = {
    recipes: Recipe[];
}

const RecipeTable: FC<AppProps> = ({recipes}) => {


    if(recipes) {
        return (
            <motion.div
                className="relative h-full w-full grid grid-cols-4 gap-10"
                initial={{y: -100}}
                animate={{y: 0}}
                transition={{duration: 0.2}}
            >
                {recipes.map((recipe) => {
                    return (
                        <RecipeCard key={recipe.id} recipe={recipe}/>
                    )
                })
                }
            </motion.div>
        )
    }
}

export default RecipeTable;

