
export default function Card({className, children}) {

    return (
        <div className={`py-4 px-8 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 ${className ?? ""}`}>
            {children}
        </div>
    )
}