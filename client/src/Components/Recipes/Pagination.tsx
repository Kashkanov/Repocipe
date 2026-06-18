import {type FC, useEffect, useRef} from "react";

type AppProps = {
    total: number;
    handlePageChange: (page: number) => void;
    currPage: number;
}

const Pagination: FC<AppProps> = ({total, handlePageChange, currPage}) => {
    /*This displays the pagination buttons which redirects to the correct page in the Seller Portal*/

    const pageButtons = [];
    const start = Math.max(currPage - 3, 1);
    const totalPages = Math.ceil(total / 8);

    const end = Math.min(currPage + 1, totalPages - 2);
    const leftDotRef = useRef<HTMLButtonElement>(null);
    const rightDotRef = useRef<HTMLButtonElement>(null);

    // console.log(`currpage: ${currPage}`)        //<===

    // generate page buttons
    for (let i = start; i <= end; i++) {
        pageButtons.push(i);
    }


    useEffect(() => {
        // add left and right dots

        if (start > 1) {
            leftDotRef.current?.style.setProperty('display', 'block');
        } else {
            leftDotRef.current?.style.setProperty('display', 'none');
        }

        if (end < totalPages - 2) {
            rightDotRef.current?.style.setProperty('display', 'block');
        } else {
            rightDotRef.current?.style.setProperty('display', 'none');
        }
    }, [currPage, start, end, pageButtons, totalPages]);


    return (
        <div className="w-full flex justify-end gap-x-4 mb-5">
            {/*previous button*/}
            <button
                className={`btn btn-primary ${currPage === 1 ? 'bg-primary text-gray-400' : 'cursor-pointer'}`}
                //onClick={() => window.location.href = `/recipes?page=${currPage - 1}`}
                onClick={()=> handlePageChange(currPage - 1)}
                disabled={currPage === 1}
            >
                &lt; Previous
            </button>

            {/*first page button*/}
            <button
                className={`btn btn-primary ${currPage === 1 ? 'bg-primary text-gray-400' : 'cursor-pointer'}`}
                //onClick={() =>  window.location.href = `/recipes?page=${1}`}
                onClick={()=> handlePageChange(1)}
                disabled={currPage === 1}
            >
                1
            </button>
            <span ref={leftDotRef}>...</span>

            {pageButtons.map((index) => (
                <button
                    key={index}
                    className={` ${index + 1 === currPage ? 'bg-primary text-gray-400' : 'cursor-pointer'}`}
                    //onClick={() =>  window.location.href = `/recipes?page=${index + 1}`}
                    onClick={() => handlePageChange(index + 1)}
                    disabled={index + 1 === currPage}
                >
                    {index + 1}
                </button>
            ))}

            <span ref={rightDotRef}>...</span>

            {/*last page button only if total pages > 1*/}
            {totalPages > 1 && (
                <button
                    className={`btn btn-primary ${currPage === totalPages ? 'bg-primary text-gray-400' : 'cursor-pointer'}`}
                    //onClick={() =>  window.location.href = `/recipes?page=${totalPages}`}
                    onClick={()=> handlePageChange(totalPages)}
                    disabled={currPage === totalPages}
                >
                    {totalPages}
                </button>
            )}
            {/*next button*/}
            <button
                className={`btn btn-primary ${currPage === totalPages ? 'bg-primary text-gray-400' : 'cursor-pointer'}`}
                onClick={()=> handlePageChange(currPage + 1)}
                disabled={currPage === totalPages}
            >
                Next &gt;
            </button>
        </div>
    )
}

export default Pagination