import {useState} from "react";
import AddIngredients from "../../Components/Matchipe/AddIngredients.js";
import {matchRecipe} from "../../services/recipeService.js";
import MatchResults from "../../Components/Matchipe/MatchResults.js";
import Loading from "../../Components/Shared/Loading.js";
import {validateIngredients} from "../../validation/addRecipeValidation.js";
import type {recipeMatch} from "../../types/recipeMatch";

const MatchPage = () => {
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [matchedRecipes, setMatchedRecipes] = useState<recipeMatch[]>([]);
    const [isValidIngredients, setValidIngredients] = useState<boolean>(true);
    const [topMatchedRecipe, setTopMatchedRecipe] = useState<recipeMatch | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmitIngredients = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(validateIngredients(ingredients)) {
            setLoading(true);

            const response = await matchRecipe(ingredients)

            const timer = new Promise(resolve =>
                setTimeout(resolve, 1000)
            );

            // Either wait for the data or 1 min for result page to load
            try {
                const [promises] = await Promise.all([response, timer]);
                if (promises) {
                    await setMatchedRecipes(promises.scores);
                    await setTopMatchedRecipe(promises.top);

                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }else setValidIngredients(false);
    }


    return (
        <div className="relative flex flex-col items-center justify-center bg-[#DAD7CD] w-full h-screen pb-5 overflow-x-hidden">
            <img className="absolute w-full h-full top-0 left-0 object-cover opacity-35"
                 alt="matchipeBg"
                 src="../../../public/assets/matchipe_bg.webp"
            />

            {loading ?
                (
                    <div className="relative flex flex-col items-center justify-center bg-[#FEF9C3] w-2/6 h-5/12 mt-25 rounded-xl gap-2 p-5">
                        <Loading/>
                        <span className="text-black">Loading</span>
                    </div>
                )
                :
                (   matchedRecipes && topMatchedRecipe ? (
                        <MatchResults
                            matchedRecipes={matchedRecipes}
                            topMatchedRecipe={topMatchedRecipe}
                            setMatchedRecipes={setMatchedRecipes}
                            setTopMatchedRecipe={setTopMatchedRecipe}
                            setIngredients={setIngredients}
                        />
                    ) : (
                        <AddIngredients
                            handleSubmitIngredients={handleSubmitIngredients}
                            ingredients={ingredients}
                            setIngredients={setIngredients}
                            isValidIngredients={isValidIngredients}
                        />
                    )
                )}
        </div>
    )
}

export default MatchPage;