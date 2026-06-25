import {motion} from "framer-motion";
import type {FC} from "react";

type AppProps = {
    title: string,
    prep_time: number,
    cook_time: number,
    description: string,
    // uploader: string
}

const Overview: FC<AppProps> = ({title, prep_time, cook_time, description /*, uploader*/}) => {

    return (
        <motion.div
            initial={{opacity: 0, x: -100}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.5}}
            className="flex-col w-1/3 text-start bg-yellow-100 rounded-lg text-black p-5"
        >
            <h1 className="text-xl font-bold pb-5">{title}</h1>
            <h2 className="text-lg pb-2"><strong>Prep
                Time</strong>: {prep_time} mins.</h2>
            <h2 className="text-lg pb-5"><strong>Cook
                Time</strong>: {cook_time} mins.</h2>
            <h3 className=" pb-5">"<i>{description}</i>"</h3>
            {/*<h3 className="">by: <u>{uploader}</u></h3>*/}
        </motion.div>
    )
}

export default Overview;
