import type {FC} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {motion} from "framer-motion";
import type {Step} from "../../../types";

interface StepBoxProps {
    index: number;
    step: Step;
    handleRemoveStep: (index: number) => void;
}

const StepBox: FC<StepBoxProps> = ({ index, step, handleRemoveStep }) => {
    return (
        <motion.div
            className="relative flex items-center w-full max-h-25 bg-[#588157] text-white rounded-lg pl-5 py-2  text-sm"
            initial={{
                opacity: 0,
                x: -500
            }}
            animate={{
                opacity: 1,
                x: 0,
                transition: {
                    duration: 0.8,
                    delay: 0.4
                }
            }}
            exit={{
                opacity: 0,
                x: -500,
                transition: {
                    duration: 0.8,
                    delay: 0.2
                }
            }}
        >
            <div className="flex justify-start w-11/12 h-full">
                <span className="w-5">{index + 1}.</span>
                <span className="w-full text-start overflow-y-auto">{step.description}</span>
            </div>
            <div className="flex justify-end w-1/12">
                <button
                    type="button"
                    className="flex justify-center items-center w-[1rem] h-[1rem] py-2 px-4 rounded-full cursor-pointer"
                    onClick={() => handleRemoveStep(index)}
                >
                    <FontAwesomeIcon icon={faXmark}/>
                </button>
            </div>
        </motion.div>
    )
}

export default StepBox
