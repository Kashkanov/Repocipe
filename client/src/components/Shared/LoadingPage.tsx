import {DotLottieReact} from '@lottiefiles/dotlottie-react';

const Loading = () => {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-yellow-100">
            {/* Green Container: Centering Lottie & Text Vertically */}
            <div className="flex flex-col items-center justify-center w-1/4 h-1/3 py-5 rounded-xl bg-[#588157]">
                <div className="w-full h-3/4 flex items-center justify-center">
                    <DotLottieReact
                        src="https://lottie.host/90ad8fba-562e-4da6-a11a-9c2ed96b9699/D4E7fAzuuH.lottie"
                        loop
                        autoplay
                    />
                </div>
                <span className="text-xl text-white mt-2">
                    <strong>
                        <i>Loading</i>
                    </strong>
                </span>
            </div>
        </div>
    )
}

export default Loading;