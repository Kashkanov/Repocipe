import type {FC} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {motion} from "framer-motion";

interface AddBasicInfoProps {
    setTitle: (title: string) => void;
    setPrepTime: (prepTime: number) => void;
    setCookTime: (cookTime: number) => void;
    setDescription: (description: string) => void;
    isTitleValid: boolean;
    isPrepTimeValid: boolean;
    isCookTimeValid: boolean;
    isDescriptionValid: boolean;
    thumbnailRef: React.RefObject<HTMLImageElement | null>;
    picNameRef: React.RefObject<HTMLInputElement | null>;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleFileRemove: () => void;
    picRef: React.RefObject<HTMLInputElement | null>;
}

const AddBasicInfo: FC<AddBasicInfoProps> = ({
                                                 setTitle,
                                                 setPrepTime,
                                                 setCookTime,
                                                 setDescription,
                                                 isCookTimeValid,
                                                 isPrepTimeValid,
                                                 isTitleValid,
                                                 isDescriptionValid,
                                                 thumbnailRef,
                                                 picNameRef,
                                                 handleFileChange,
                                                 handleFileRemove,
                                                 picRef
                                             }) => {
    return (
        <motion.div
            className="flex w-full h-full bg-yellow-100 rounded-xl p-5 shadow-lg shadow-gray-900"
            initial={{
                opacity: 0,
                scale: 0.8,
                y: 100
            }}
            animate={{
                opacity: 1,
                scale: 1,
                y: 0
            }}
            transition={{
                duration: 0.3,
            }}
        >
            {/* title, prep_time, cook_time, description */}
            <div className="flex flex-col w-1/2 h-full pr-5 gap-y-2">
                {/* title */}
                <label
                    className="relative flex flex-col items-start p-2 text-sm"
                    htmlFor="title"
                >
                    <div className="relative flex w-full gap-1">
                        <p>Name</p>
                        {!isTitleValid &&
                            <span
                                className="text-red-500 text-sm italic">Cannot be empty<b></b></span>
                        }
                    </div>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        autoComplete="on"
                        onChange={(e) => setTitle(e.target.value)}
                        // onBlur={(e) => setIsTitleValid(validateTitle(e.target.value))}
                        className="w-full rounded-sm bg-white border-1 border-gray-300 p-1"
                    />
                </label>
                {/* prep_time, cook_time */}
                <div className="flex w-full items-start px-2">
                    {/* prep_time */}
                    <label
                        className="flex flex-col items-start text-sm"
                        htmlFor="prep_time"
                    >
                        <p>Prep Time </p>
                        <div className="relative flex justify-start items-center">
                            <input
                                type="number"
                                id="prep_time"
                                name="prep_time"
                                autoComplete="on"
                                onChange={(e) => setPrepTime(parseInt(e.target.value))}
                                className="w-1/4 rounded-sm bg-white border-1 border-gray-300 p-1"
                            /> &nbsp; <span className="text-sm"><strong>mins</strong></span>
                            {!isPrepTimeValid &&
                                <span
                                    className="absolute text-red-600 text-sm bottom-[-1.4rem]">Must be more than 0</span>
                            }
                        </div>
                    </label>
                    {/* cook_time */}
                    <label
                        className="flex flex-col items-start text-sm"
                        htmlFor="prep_time"
                    >
                        <p>Cook Time</p>
                        <div className="relative flex justify-start items-center">
                            <input
                                type="number"
                                id="cook_time"
                                name="cook_time"
                                autoComplete="on"
                                onChange={(e) => setCookTime(parseInt(e.target.value))}
                                // onBlur={(e) => setIsCookTimeValid(validateCookTime(e.target.value))}
                                className="w-1/4 rounded-sm bg-white border-1 border-gray-300 p-1"
                            /> &nbsp; <span className="text-sm"><strong>mins</strong></span>
                            {!isCookTimeValid &&
                                <span
                                    className="absolute text-red-600 text-sm bottom-[-1.4rem]">Must be more than 0</span>
                            }
                        </div>
                    </label>

                </div>
                {/* description */}
                <label
                    className="relative flex flex-col items-start pt-2 px-2 text-sm h-full"
                    htmlFor="description"
                >
                    <div className="flex w-full gap-1">
                        <p>Description</p>
                        {!isDescriptionValid &&
                            <span className="text-red-600 text-sm italic">Cannot be empty<b></b></span>
                        }
                    </div>
                    <textarea
                        id="description"
                        name="description"
                        autoComplete="on"
                        onChange={(e) => setDescription(e.target.value)}
                        // onBlur={(e) => setIsDescriptionValid(validateDescription(e.target.value))}
                        className="w-full h-48 rounded-sm bg-white border-1 border-gray-300 p-1 resize-none"
                    />

                </label>
            </div>

            {/* picture */}
            <div className="flex flex-col items-center w-1/2 h-full pl-5">
                <label
                    className="flex flex-col w-full h-full items-start text-sm"
                    htmlFor="image"
                >
                    <p>Image</p>
                    <div
                        className="relative flex justify-center w-full max-w-full h-11/12 max-h-full bg-black border-1 border-gray-300 overflow-hidden mb-3">
                        <img
                            className="object-cover"
                            src="../../../public/assets/placeholderPic.png"
                            ref={thumbnailRef}
                            alt=""
                        />
                    </div>
                    <div className="flex w-full h-1/12 justify-start items-center gap-2">
                        <button
                            type="button"
                            className="border bg-blue-400 w-3/12 text-white text-sm h-full p-1 rounded-sm"
                            onClick={() => picRef.current?.click()}
                        >
                            Upload
                        </button>
                        <input
                            type="file"
                            id="pic"
                            accept="image/*"
                            ref={picRef}
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <input
                            type="text"
                            id="picture"
                            ref={picNameRef}
                            name="picture"
                            className="w-7/12 h-full rounded-sm bg-white p-1 cursor-not-allowed"
                            readOnly
                        />
                        <button
                            type="button"
                            className="relative flex justify-center items-center border bg-red-400 w-3/12 text-white h-full rounded-sm"
                            onClick={handleFileRemove}
                        >
                            <FontAwesomeIcon
                                className="fa-xs"
                                icon={faTrash}
                            />
                        </button>
                    </div>
                </label>
            </div>
        </motion.div>
    )
}

export default AddBasicInfo
