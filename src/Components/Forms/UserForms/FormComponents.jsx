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
  formikError
}) {
  return (
    <input
      className={
        invisible === true
          ? 'invisible m-0 w-0 h-0 l-0 r-0'
          : `mb-3 appearance-none block w-full bg-gray-200 text-gray-700 border ${value.length > 0 && formikError ? 'border-red-500' : 'border-gray-200'
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
  return <p className="-mt-2 text-sm text-red-500 font-semibold">{msg}</p>;
}

export function FormButton({ children, className, type, onClick }) {
  return (
    <button
      type={type || 'button'}
      className={`flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded ${className}`}
      onClick={onClick}>
      {children}
    </button>
  );
}

export function FormLabel({ labelButton = false, children, htmlFor, onClick, className }) {
  return (
    <label
      className={
        labelButton === true
          ? `primaryButton hover:opacity-80 text-white rounded-md shadow-md disabled:opacity-75 ${className}`
          : `block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${className}`
      }
      htmlFor={htmlFor}
      onClick={onClick}>
      {children}
    </label>
  );
}

export function PreviewImage({ className, file, onClick }) {
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
    <div className={`flex flex-col justify-center items-center ${className ?? ""}`}>
      <button
        onClick={onClick}
        className="hover:bg-red-700 anim z-10 h-32 w-32 rounded-full border-4 border-slate-500 bg-opacity-0	text-white font-bold text-xl">
        X
      </button>
      <img
        src={file.type ? preview : file}
        alt={nameImage}
        className="z-1 absolute h-32 w-32 rounded-full border-4 border-slate-500 object-cover object-center"
      />
    </div>
  );
}
