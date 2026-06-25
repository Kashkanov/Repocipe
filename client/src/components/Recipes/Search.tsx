import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import type {FC} from "react";

type AppProps = {
    localSearch: string,
    handleSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleSearch: ()=>void,
}

const Search: FC<AppProps> = ({localSearch, handleSearchInputChange, handleSearch}) => {
    return (
        <div className="flex justify-center items-center h-1/12 w-full mt-20 px-5 py-1">
            <div className="flex justify-center items-center w-full h-full bg-gray-800 rounded-md px-5 gap-1 py-2">
                <label className="text-xl" htmlFor="search">Search: </label>
                <input
                    className="bg-white rounded-sm w-5/6 h-full text-black p-1"
                    name="search"
                    id="search"
                    value={localSearch}
                    onChange={handleSearchInputChange}
                    type="text"/>
                <button
                    onClick={handleSearch}
                    className="flex items-center justify-center bg-blue-500 w-1/6 rounded-sm h-full"
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </div>
    )
}

export default Search;