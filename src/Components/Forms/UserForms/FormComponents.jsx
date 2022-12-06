export function FormInput({
    className,
    id,
    name,
    type,
    onChange,
    value,
    placeholder,
    formikError,
}) {
    return (
        <input
            className={`mb-3 appearance-none block w-full bg-gray-200 text-gray-700 border ${
                value.length > 0 && formikError
                    ? 'border-red-500'
                    : 'border-gray-200'
            } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-teal-500 ${className}`}
            id={id}
            name={name}
            type={type}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
        />
    );
}

export function ErrorMessage({ msg }) {
    return <p className='text-sm text-red-500 font-semibold'>{msg}</p>;
}

export function FormButton({ children, className, type, onClick }) {
    return (
        <button
            type={type || 'button'}
            className={`flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export function FormLabel({ children, htmlFor }) {
    return (
        <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor={htmlFor}
        >
            {children}
        </label>
    );
}
