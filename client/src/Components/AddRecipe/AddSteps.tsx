import {type FC, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons/faCirclePlus";
import {motion} from "framer-motion";
import {AnimatePresence} from "motion/react";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

type AppProps = {
    steps: string[];
    setSteps: React.Dispatch<React.SetStateAction<string[]>>;
    stepCount: number;
    setStepCount: React.Dispatch<React.SetStateAction<number>>;
    isInstructionsValid: boolean;
}

const AddSteps: FC<AppProps> = ({steps, setSteps, stepCount, setStepCount, isInstructionsValid}) => {

    const newStepRef = useRef<HTMLTextAreaElement>(null);
    const [isStepValid, setIsStepValid] = useState<boolean>(false);

    const handleAddStep = () => {
        if (newStepRef.current) {
            const newStep = newStepRef.current.value;

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
        <div className="flex flex-col w-full bg-yellow-100 rounded-xl p-5 shadow-lg shadow-gray-900">
            <div className="flex justify-start m-5">
                <h2 className="text-3xl"><b>Steps</b></h2>
            </div>
            <div className="relative flex flex-col w-full px-5 list-decimal">
                <AnimatePresence>
                    {/* Existing steps */}
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="relative flex items-center w-full h-25 bg-[#588157] text-white rounded-lg p-10 mb-5 text-xl"
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
                            <li className="flex justify-start w-5/6">{index + 1}. {step}</li>
                            <div className="flex justify-end w-1/6">
                                <button
                                    type="button"
                                    className="absolute flex justify-center items-center right-[-10px] top-[-10px] w-[3rem] h-[3rem] bg-red-400 hover:bg-red-700 text-white text-sm py-2 px-4 rounded-full"
                                    onClick={() => handleRemoveStep(index)}
                                >
                                    <FontAwesomeIcon icon={faXmark}/>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {/* Add new step */}
                <div
                    className="flex flex-col items-center justify-center w-full h-60 bg-[#dad7cd] text-[#344e41] rounded-lg mb-5 text-xl"
                >
                    <div className="relative flex w-full h-4/6">
                        <div className="flex justify-center w-full mx-5">
                            <label
                                htmlFor="stepField"
                                className="flex flex-col justify-center w-full items-center gap-y-2 "
                            >
                                <p className="text-2xl">Step</p>
                                <textarea
                                    id="stepField"
                                    name="stepField"
                                    onChange={checkIsStepValid}
                                    ref={newStepRef}
                                    className="w-full h-30 text-black bg-white rounded-md text-lg px-3 resize-none"
                                />
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-center items-center w-full h-2/6">
                        <button
                            type="button"
                            className={`text-white h-10 text-[18px] px-4 rounded ${isStepValid ? "bg-[#344e41] hover:bg-[#588157]" : "bg-gray-400 cursor-not-allowed"}`}
                            disabled={!isStepValid}
                            onClick={handleAddStep}
                            // onClick={() => {
                            //     handleAddStep(
                            //         document.getElementById(`step-${stepCount}`).value
                            //     );
                            //     setStepCount(stepCount + 1);
                            // }}
                        >
                            Add Step <FontAwesomeIcon icon={faCirclePlus}/>
                        </button>
                    </div>
                </div>
                {!isInstructionsValid &&
                    <span className="absolute text-red-600 bottom-[-0.5rem]">Please add at least one step</span>
                }
            </div>
        </div>
    )
}

export default AddSteps
