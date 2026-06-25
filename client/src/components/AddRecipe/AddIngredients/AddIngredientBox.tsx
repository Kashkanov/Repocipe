import type {FC, RefObject} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons/faCirclePlus";

interface AddIngredientBoxProps {
    newIngredientRef: RefObject<HTMLDivElement | null>
    qtyRef: RefObject<HTMLInputElement | null>
    checkIsIngredientValid: () => void
    handleAddIngredient: () => void
    isIngredientValid: boolean
    unitRef: RefObject<HTMLInputElement | null>
    nameRef: RefObject<HTMLInputElement | null>
    descriptionRef: RefObject<HTMLInputElement | null>
}

const AddIngredientBox: FC<AddIngredientBoxProps> = ({
    newIngredientRef,
    qtyRef,
    checkIsIngredientValid,
    handleAddIngredient,
    isIngredientValid,
    unitRef,
    nameRef,
    descriptionRef
}) => {
    return (
        <div
            className="flex flex-col items-center justify-center w-full h-32 bg-[#dad7cd] text-[#344e41] rounded-sm mb-5 text-xl">
            <div ref={newIngredientRef} className="relative flex w-full h-2/3">
                <div className="flex justify-center w-1/12 px-1">
                    <label
                        htmlFor="qtyField"
                        className="flex flex-col justify-center items-center w-full text-sm"
                    >
                        <p>Qty</p>
                        <input
                            ref={qtyRef}
                            id="qtyField"
                            name="qtyField"
                            type="number"
                            onChange={checkIsIngredientValid}
                            className="w-full h-10 text-black bg-white border-1 border-gray-300 rounded-sm px-1"
                        />
                    </label>
                </div>
                <div className="flex justify-center w-2/12 px-1">
                    <label
                        htmlFor="unitField"
                        className="flex flex-col justify-center items-center w-full text-sm"
                    >
                        <p>Unit</p>
                        <input
                            ref={unitRef}
                            id="unitField"
                            name="unitField"
                            onChange={checkIsIngredientValid}
                            className="w-full h-10 text-black bg-white border-1 border-gray-300 rounded-sm px-1"
                        />
                    </label>
                </div>
                <div className="relative flex justify-center w-3/12 px-1">
                    <label
                        htmlFor="nameField"
                        className="flex flex-col justify-center items-center w-full text-sm"
                    >
                        <p>Name</p>
                        <input
                            ref={nameRef}
                            id="nameField"
                            name="nameField"
                            onChange={checkIsIngredientValid}
                            className="w-full h-10 text-black bg-white border-1 border-gray-300 rounded-sm px-1"
                        />
                    </label>
                </div>
                <div className="relative flex justify-center w-7/12 px-1">
                    <label
                        htmlFor="descriptionField"
                        className="flex flex-col justify-center items-center w-full text-sm"
                    >
                        <p>Description</p>
                        <input
                            ref={descriptionRef}
                            id="descriptionField"
                            name="descriptionField"
                            onChange={checkIsIngredientValid}
                            className="w-full h-10 text-black bg-white border-1 border-gray-300 rounded-sm px-1"
                        />
                    </label>
                </div>
            </div>
            <div className="flex justify-center items-center w-full h-1/3 text-sm">
                <button
                    type="button"
                    className={`text-white h-7 px-4 rounded ${isIngredientValid ? "bg-[#344e41] hover:bg-[#588157]" : "bg-gray-400 cursor-not-allowed"}`}
                    disabled={!isIngredientValid}
                    onClick={handleAddIngredient}
                >
                    Add Ingredient <FontAwesomeIcon icon={faCirclePlus}/>
                </button>
            </div>
        </div>
    )
}

export default AddIngredientBox
