import type {FC, RefObject} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons/faCirclePlus";

interface AddStepBoxProps {
    checkIsStepValid: () => void;
    handleAddStep: () => void;
    isStepValid: boolean;
    newStepRef: RefObject<HTMLTextAreaElement | null>;
}

const AddStepBox: FC<AddStepBoxProps> = ({ checkIsStepValid, handleAddStep, isStepValid, newStepRef }) => {
    return (
        <div
            className="flex flex-col items-center justify-center w-full h-40 bg-[#dad7cd] text-[#344e41] rounded-lg mb-5 text-xl"
        >
            <div className="relative flex w-full h-2/3 text-sm">
                <div className="flex justify-center w-full mx-5">
                    <label
                        htmlFor="stepField"
                        className="flex flex-col justify-center w-full items-center "
                    >
                        <p>Step</p>
                        <textarea
                            id="stepField"
                            name="stepField"
                            onChange={checkIsStepValid}
                            ref={newStepRef}
                            className="w-full h-30 text-black bg-white border-1 border-gray-300 rounded-md px-1 resize-none"
                        />
                    </label>
                </div>
            </div>
            <div className="flex justify-center items-center w-full h-1/3 text-sm">
                <button
                    type="button"
                    className={`text-white h-7 px-4 rounded ${isStepValid ? "bg-[#344e41] hover:bg-[#588157]" : "bg-gray-400 cursor-not-allowed"}`}
                    disabled={!isStepValid}
                    onClick={handleAddStep}
                >
                    Add Step <FontAwesomeIcon icon={faCirclePlus}/>
                </button>
            </div>
        </div>
    )
}

export default AddStepBox
