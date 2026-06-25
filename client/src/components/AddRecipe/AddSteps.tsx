import {type FC, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons/faCirclePlus";
import {motion} from "framer-motion";
import {AnimatePresence} from "motion/react";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import type {Step} from "../../types";
import StepBox from "./AddSteps/StepBox";
import AddStepBox from "./AddSteps/AddStepBox";

type AppProps = {
    steps: Step[];
    setSteps: React.Dispatch<React.SetStateAction<Step[]>>;
    stepCount: number;
    setStepCount: React.Dispatch<React.SetStateAction<number>>;
    isInstructionsValid: boolean;
}

const AddSteps: FC<AppProps> = ({steps, setSteps, stepCount, setStepCount, isInstructionsValid}) => {

    const newStepRef = useRef<HTMLTextAreaElement>(null);
    const [isStepValid, setIsStepValid] = useState<boolean>(false);

    const handleAddStep = () => {
        if (newStepRef.current) {
            const newStep = {
                description: newStepRef.current.value
            }

            setSteps([...steps, newStep]);
            setStepCount(stepCount + 1);
            clearInputs();
        }
    };

    const clearInputs = () => {
        if (newStepRef.current)
            newStepRef.current.value = "";
        setIsStepValid(false)
    };

    const handleRemoveStep = (index: number) => {
        const newSteps = [...steps];
        newSteps.splice(index, 1);
        setSteps(newSteps);
    };

    const checkIsStepValid = () => {
        if (newStepRef.current?.value?.trim())
            setIsStepValid(true);
        else setIsStepValid(false);
    }

    return (
        <div className="flex flex-col w-full bg-yellow-100 rounded-xl p-1 shadow-lg shadow-gray-900">
            <div className="flex items-center justify-start mb-1 mx-5 gap-1">
                <h2 className="text-xl"><b>Steps</b></h2>
                {!isInstructionsValid &&
                    <span className="text-red-600 text-sm italic">Please add at least one step</span>
                }
            </div>
            <div className="relative flex flex-col w-full px-5 list-decimal gap-y-1">
                <AnimatePresence>
                    {/* Existing steps */}
                    {steps.map((step, index) => (
                        <StepBox
                            key={index}
                            index={index}
                            step={step}
                            handleRemoveStep={handleRemoveStep}
                        />
                    ))}
                </AnimatePresence>
                {/* Add new step */}
                { newStepRef &&
                    <AddStepBox
                        checkIsStepValid={checkIsStepValid}
                        handleAddStep={handleAddStep}
                        isStepValid={isStepValid}
                        newStepRef={newStepRef}
                    />
                }

            </div>
        </div>
    )
}

export default AddSteps
