import { useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

const Register = () => {

    type Slide = {
        id: number,
        src: string,
    }

    const slideshowPics: Slide[] = [
        {
            id: 0,
            src: "./assets/chopping.jpg"
        },
        {
            id: 1,
            src: "./assets/fresh.jpg"
        },
        {
            id: 2,
            src: "./assets/spreading-flour.jpg"
        },
        {
            id: 3,
            src: "./assets/pancakes.jpg"
        },
        {
            id: 4,
            src: "./assets/tasting.jpg"
        }
    ]

    const totalPics = slideshowPics.length;
    const [slideshowIndex, setSlideshowIndex] = useState<number>(0);
    const picRef = useRef<HTMLImageElement>(null);

    const navigate = useNavigate();

    // const api_url = "http://localhost:5050/";
    const api_url = "http://localhost:8001/";
    const register = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const username = form.username.value;
        const email = form.email.value;
        const firstname = "";
        const lastname = "";
        const password = form.password.value;
        const data = {username, password, email, firstname, lastname};

        fetch(api_url + "api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .catch((err) => {
                console.log(err);
            });

        navigate("/")

    }

    /*Animate to next event*/
    const handleNext = () => {
        console.log("next")     //<===
        let ind = slideshowIndex;
        ind++;
        if (ind >= totalPics)
            ind = 0;
        //add entrance animation
        if (picRef.current) {
            picRef.current.classList.add(...["animate-fade-right", "animate-once", "animate-duration-1000", "animate-ease-in-out", "animate-reverse"]);
        }
        setTimeout(() => {
            setSlideshowIndex(ind);
            //remove entrance animation and add exit animation
            if (picRef.current) {
                picRef.current.classList.remove(...["animate-fade-right", "animate-once", "animate-duration-1000", "animate-ease-in-out", "animate-reverse"]);
                //picRef.current.classList.add(...["animate-fade-left", "animate-once", "animate-duration-1000", "animate-ease-in-out", "animate-normal"]);
            }
        }, 1000)
    }

    /*Handles auto-next for main events*/
    useEffect(() => {
        console.log("auto-next")        //<===
        const intervalId = setInterval(() => {
            if (totalPics > 1) {
                let currInd = slideshowIndex;
                handleNext();
                if (currInd >= totalPics)
                    currInd = 0;
                setSlideshowIndex(currInd);
            }
        }, 10000);
        return () => clearInterval(intervalId);
    }, [slideshowIndex]);

    return (
        <div className="relative flex flex-col justify-center items-center w-screen h-dvh overflow-x-hidden bg-[#a3b18a]">
            <div className="flex w-4/6 h-5/6 bg-[#588157] rounded-xl overflow-hidden">
                <div className="w-1/2 h-full">
                    <div className="flex justify-start p-5 mt-2">
                        <h2 className="text-4xl"><strong>Become a member!</strong></h2>
                    </div>
                    <form
                        onSubmit={register}
                        className="flex flex-col items-center w-full h-full pb-5"
                    >
                        <label className="flex flex-col justify-center items-start w-4/6 gap-y-2 mb-5">
                            <span>Username</span>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="w-full bg-white p-1 rounded-md text-black"
                            />
                        </label>
                        <label className="flex flex-col justify-center items-start w-4/6 gap-y-2 mb-5">
                            <span>Email</span>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                className="w-full bg-white p-1 rounded-md text-black"
                            />
                        </label>
                        <label className="flex flex-col justify-center items-start w-4/6 gap-y-2 mb-5">
                            <span>Password</span>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-full bg-white p-1 rounded-md text-black"
                            />
                        </label>
                        <label className="flex flex-col justify-center items-start w-4/6 gap-y-2 mb-10">
                            <span>Confirm Password</span>
                            <input
                                type="password"
                                id="confPassword"
                                className="w-full bg-white p-1 rounded-md text-black"
                            />
                        </label>
                        <hr className="w-11/12 text-[#3a5a40] border mb-10"/>
                        <button
                            type="submit"
                            className="w-4/6 h-10 bg-[#344e41] text-white rounded-md"
                        >
                            Register
                        </button>
                    </form>
                </div>
                <div className="w-1/2 h-full overflow-hidden">
                    <img
                        key={slideshowPics[slideshowIndex]?.id}
                        ref={picRef}
                        src={slideshowPics[slideshowIndex]?.src}
                        alt="pic"
                        className="w-full h-full object-cover animate-fade-left animate-once animate-duration-1000 animate-ease-in-out animate-normal"
                    />
                </div>

            </div>

        </div>
    )
}

export default Register