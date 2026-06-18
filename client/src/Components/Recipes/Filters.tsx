const Filters = () => {

    const cuisines = [
        "Filipino", "American", "Chinese", "Japanese", "Spanish"
    ]
    const sortFilters = [
        "Recipe Name(A-Z)",
        "Recipe Name(Z-A)",
        "Cook Time(Ascending)",
        "Cook Time(Descending)",
        "Prep Time(Ascending)",
        "Prep Time(Descending)",
    ]

    return (
        <div className="flex justify-center items-center h-11/12 w-full px-5 pt-1">
            <div className="flex flex-col justify-start items-start w-full h-full bg-gray-800 rounded-md p-5 gap-y-3">
                <span className="text-2xl">Filters</span>
                <div className="flex flex-col justify-start items-start w-full my-2">
                    <div className="text-xl w-full rounded-lg bg-gray-200 flex p-1 mb-2 text-gray-700">Cuisine Type</div>
                    {cuisines.map((cuisine, index) => (
                        <label htmlFor="cuisine" className="px-2">
                            <input type="radio" id="cuisine" name="cuisine"/>
                            &nbsp; {cuisine}
                        </label>
                        ))
                    }
                </div>
                <div className="flex flex-col justify-start items-start w-full my-2">
                    <div className="text-xl w-full rounded-lg bg-gray-200 flex p-1 mb-2 text-gray-700">Sort</div>
                    {sortFilters.map((sFil, index) => (
                        <label htmlFor="sort" className="px-2">
                            <input type="radio" id="sort" name="sort"/>
                            &nbsp; {sFil}
                        </label>
                    ))
                    }
                </div>
                <button>
                    Apply Filters
                </button>
            </div>

        </div>
    )
}

export default Filters;