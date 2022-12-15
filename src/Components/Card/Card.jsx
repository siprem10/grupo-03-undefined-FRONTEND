
export default function Card({className, children}) {

    return (
        <div className={`py-4 px-8 bg-white border border-gray-200 rounded-lg shadow-md ${className ?? ""}`}>
            {children}
        </div>
    )
}