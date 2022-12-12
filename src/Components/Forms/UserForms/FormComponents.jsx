import { useState } from 'react';

export function FormInput({
    className,
    invisible = false,
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
            className={
                invisible === true
                    ? 'invisible m-0 w-0 h-0 l-0 r-0'
                    : `mb-3 appearance-none block w-full bg-gray-200 text-gray-700 border ${
                          value.length > 0 && formikError
                              ? 'border-red-500'
                              : 'border-gray-200'
                      } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-teal-500 ${className}`
            }
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
    return (
        <p className='mt-4 text-center text-sm text-red-500 font-semibold'>
            {msg}
        </p>
    );
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

export function FormLabel({
    labelButton = false,
    children,
    htmlFor,
    onClick,
    className,
}) {
    return (
        <label
            className={
                labelButton === true
                    ? `flex space-x-2 justify-center items-center w-fit m-0 px-6 py-2.5 bg-teal-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-teal-700 hover:shadow-lg focus:bg-teal-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-teal-800 active:shadow-lg transition duration-150 ease-in-out hover:cursor-pointer ${className}`
                    : `block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${className}`
            }
            htmlFor={htmlFor}
            onClick={onClick}
        >
            {children}
        </label>
    );
}

export function PreviewImage({ file, onClick }) {
    const [preview, setPreview] = useState(null);
    const nameImage = !file.name ? file.split('/')[4] : file.name;

    if (file.type) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setPreview(reader.result);
        };
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <button
                onClick={onClick}
                className='relative top-4 left-14 px-2 py-1 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out mb-2'
            >
                X
            </button>
            <img
                src={file.type ? preview : file}
                alt={nameImage}
                className='h-32 w-36 rounded-full'
            />
        </div>
    );
}
