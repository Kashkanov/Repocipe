import {motion} from "framer-motion";
import {Link} from "react-router-dom";
import type {FC} from "react";
import type {Recipe} from "../../types";

type AppProps = {
    recipe: Recipe;
}

const RecipeCard: FC<AppProps> = ({recipe}) => {

    return (
        <motion.div
            key={recipe.id}
            // initial="rest"
            // animate="rest"
            whileHover="hover"
            className="relative w-full h-[240px]"
        >
            <Link
                to={`/recipes/${recipe.id}`}
                className="absolute w-full h-full top-0 left-0 z-50"
            >
            </Link>
            <motion.div
                className="relative w-full h-full flex flex-col bg-[#344e41] rounded overflow-hidden cursor-pointer gap-2"
                // variants={
                //     {
                //         rest: {
                //             scaleX: [1, 0, 1],
                //             transition: {duration: 0.5, ease: "easeOut"}
                //         },
                //         hover: {
                //             scaleX: [1, 0, 1],
                //             transition: {duration: 0.5, ease: "easeOut"}
                //         }
                //
                //     }
                // }
                initial={{
                    scale: 1,
                    backgroundColor: "#344e41"
                }}
                // whileHover="hover"
                variants={{
                    hover: {
                        scale: 1.2,
                        backgroundColor: "#ffffff"
                    }
                }}
            >
                {recipe.image &&
                    <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="h-3/4 max-h-3/4 w-full object-cover"
                    />
                }
                <motion.div
                    className="flex h-1/4 w-full justify-center items-center"
                    initial={{
                        color: "#ffffff"
                    }}
                    variants={{
                        hover: {
                            color: "#000000",
                            fontWeight: 700
                        }
                    }}
                >
                    {recipe.name}
                </motion.div>
                {/* Back part with details */}
                {/*<motion.div*/}
                {/*    className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-[#3a5a40] p-5"*/}
                {/*    variants={*/}
                {/*        {*/}
                {/*            rest: {*/}
                {/*                opacity: 0,*/}
                {/*                transition: {delay: 0.2, duration: 0.1, ease: "linear"}*/}
                {/*            },*/}
                {/*            hover: {*/}
                {/*                opacity: 1,*/}
                {/*                transition: {delay: 0.2, duration: 0.1, ease: "linear"}*/}
                {/*            }*/}
                {/*        }*/}
                {/*    }*/}
                {/*>*/}
                {/*    <p className="text-lg pb-5">{recipe.title}</p>*/}
                {/*    <p className="text-sm">"<i>{recipe.description}</i>"</p>*/}
                {/*</motion.div>*/}
            </motion.div>
        </motion.div>
    )
}

export default RecipeCard
