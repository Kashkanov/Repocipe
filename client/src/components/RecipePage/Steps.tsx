import {motion} from "framer-motion";
import type {FC} from "react";
import type {Step} from "../../types";

type AppProps = {
    steps: Step[];
};

const Steps: FC<AppProps> = ({steps}) => {

    return (
        <div className="flex-col text-start bg-yellow-100 rounded-lg text-black p-5 ">
            <span className="text-2xl font-bold pb-5">Instructions</span>
            {steps &&
                (
                    <div className="flex flex-col w-full gap-y-10">
                            {steps.map((step, index) => {
                                return (
                                    <motion.div key={index}
                                               className="relative text-lg items-center py-5 px-2"
                                               initial={{scale: 1}}
                                               whileHover={{
                                                   scale: 1.1,
                                                   background: "white",
                                                   fontWeight: "bold"
                                               }}
                                               transition={{duration: 0.3}}
                                    >
                                        {step.stepNo}. {step.description}
                                    </motion.div>
                                )
                            })}
                    </div>
                )
            }
        </div>
    )
}

export default Steps;
