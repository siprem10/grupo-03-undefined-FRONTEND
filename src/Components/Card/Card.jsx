
export default function Card({className, children}) {

    return (
        <div className={`md:w-1/2 2xl:w-2/6	w-96 py-2 px-8 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 ${className ?? ""}`}>
            {children}
        </div>
    )
}