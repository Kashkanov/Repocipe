import RecipeTable from "../../components/Recipes/RecipeTable.js";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import Pagination from "../../components/Recipes/Pagination.js";
import {getAllRecipesAndCount} from "../../services/api.js";
import type {Recipe} from "../../types";
import Filters from "../../components/Recipes/Filters";
import Search from "../../components/Recipes/Search";
import {motion} from "framer-motion";

const Recipes = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [recipes, setRecipes] = useState<Recipe[]>();
    const [total, setTotal] = useState<number>(0);
    const page = parseInt(searchParams.get("page") ?? "1");
    const search = searchParams.get("search") ?? ""
    const [localSearch, setLocalSearch] = useState<string>("");

    async function AllRecipesAndCount() {

        // setSearchParams({search: localSearch, page: page.toString()});

        try {
            const response = await getAllRecipesAndCount(page, localSearch);
            setRecipes(response.data.recipes);
            setTotal(response.data.total);
        } catch (error) {
            console.error(error);
        }
    }

    function handlePageChange(newPage: number) {
        setSearchParams((prev) => {
            const updated = new URLSearchParams(prev);
            updated.set("page",newPage.toString())
            return updated
        });
    }

    function handleSearchInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        console.log(e.target.value)     //<===
        setLocalSearch(e.target.value);
    }

    function handleSearch() {
        // setSearchParams({'search': searchInputValue, 'page': page.toString()})
        // setLocalSearch(searchInputValue);
        setSearchParams({search: localSearch, page: "1"});
        AllRecipesAndCount();
    }

    useEffect(() => {
        AllRecipesAndCount();
    }, [page]);

    return (
        <div
            className="relative flex-col justify-center items-center w-screen h-dvh bg-gradient-to-bl bg-[#a3b18a] overflow-x-hidden">
            <div className="flex justify-center h-full w-full gap-y-3">
                <div className="relative flex flex-col justify-center items-center w-1/4 h-full">
                    <Search
                        localSearch={localSearch}
                        handleSearchInputChange={handleSearchInputChange}
                        handleSearch={handleSearch}
                    />
                    <Filters/>
                </div>
                <div className="relative flex flex-col justify-start items-center w-3/4 h-full">
                    <div className="w-full flex flex-col justify-start items-start h-2/12 px-5 mt-20">
                        <motion.h1
                            className="font-bold text-[#3a5a40] border-b-2 w-full text-start"
                            initial={{
                                opacity: 0,
                                x: -100
                            }}
                            animate={{
                                opacity: 1,
                                x: 0
                            }}
                            transition={{
                                duration: 0.5,
                                delay: 0.5,
                            }}
                        >
                            Explore Recipes
                        </motion.h1>
                    </div>
                    {recipes && (
                        <div className="relative flex justify-center w-full h-9/12 px-10">
                            <RecipeTable recipes={recipes}/>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex justify-end p-5 w-full bottom-0 right-0 mt-10 bg-[#588157]">
                {total > 0 &&
                    <Pagination total={total} handlePageChange={handlePageChange} currPage={page}/>
                }
            </div>

        </div>
    )
}

export default Recipes;