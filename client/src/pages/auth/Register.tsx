import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {register} from "../../services/api";

const Register = () => {

    const usernameErrRef = useRef<HTMLSpanElement>(null);
    const passwordErrRef = useRef<HTMLSpanElement>(null);
    const confirmPasswordErrRef = useRef<HTMLSpanElement>(null);

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

    const validate = (form: HTMLFormElement): boolean => {

        if (!form.username.value) {
            if (usernameErrRef.current) {
                usernameErrRef.current.textContent = "Username is required";
            }
            return false;
        }

        if (!form.password.value) {
            if (passwordErrRef.current) {
                passwordErrRef.current.textContent = "Password is required";
            }
            return false;
        }

        if (!form.confPassword.value) {
            if (confirmPasswordErrRef.current) {
                confirmPasswordErrRef.current.textContent = "Confirm password";
            }
            return false;
        }

        if (form.password.value !== form.confPassword.value) {
            if (passwordErrRef.current) {
                passwordErrRef.current.textContent = "Passwords are not a match";
            }
            return false;
        }

        return true;
    }

    const clearValErrors = () => {
        if(usernameErrRef.current && passwordErrRef.current && confirmPasswordErrRef.current){
            usernameErrRef.current.textContent = "";
            passwordErrRef.current.textContent = "";
            confirmPasswordErrRef.current.textContent = "";
        }
    }

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        clearValErrors();
        const form = e.currentTarget;
        const username = form.username.value;
        const password = form.password.value;
        if (validate(form)) {
            try {
                const response = await register(username, password);
                navigate("/login");
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 409) {
                        if (usernameErrRef.current) {
                            usernameErrRef.current.textContent = "Username already exists";
                        }
                    }
                }
            }
        }
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
        <div
            className="relative flex flex-col justify-center items-center w-screen h-dvh overflow-x-hidden bg-[#a3b18a]">
            <div className="flex w-4/6 h-2/3 bg-[#588157] rounded-xl overflow-hidden mt-12">
                <div className="w-1/2 h-full">
                    <div className="flex justify-start p-5 mt-2">
                        <h2 className="text-4xl"><strong>Become a member!</strong></h2>
                    </div>
                    <form
                        onSubmit={handleRegister}
                        className="flex flex-col items-center w-full h-full pb-5"
                    >
                        <label className="flex flex-col justify-center items-start w-4/6 mb-1">
                            <span>Username</span>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="w-full bg-white p-1 rounded-md text-black"
                            />
                            <span ref={usernameErrRef} className="h-3 text-red-400 text-sm italic"></span>
                        </label>
                        <label className="flex flex-col justify-center items-start w-4/6 mb-1">
                            <span>Password</span>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-full bg-white p-1 rounded-md text-black"
                            />
                            <span ref={passwordErrRef} className="h-3 text-red-400 text-sm italic"></span>
                        </label>
                        <label className="flex flex-col justify-center items-start w-4/6">
                            <span>Confirm Password</span>
                            <input
                                type="password"
                                id="confPassword"
                                name="confPassword"
                                className="w-full bg-white p-1 rounded-md text-black"
                            />
                            <span ref={confirmPasswordErrRef} className="h-3 text-red-400 text-sm italic"></span>
                        </label>
                        <hr className="w-11/12 text-[#3a5a40] border m-10"/>
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