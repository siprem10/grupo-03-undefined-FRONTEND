import { useState } from "react";

export default function CategoryDropdown({ title, items, className, setState, itemDefSelect }) {

    const [isShow, setShow] = useState(false);
    const [itemSelect, setItemSelect] = useState(itemDefSelect ?? "Internet");

    function handleShow() {
        setShow(!isShow);
    }

    function handleSetState(any) {
        setState(Number(any.id));
        handleShow();
        setItemSelect(any.name);
    }

    return (
        <div className={`flex flex-col w-full cursor-pointer ${className ?? ""}`}>
            <label className="label">{title ?? "Dropdown"}</label>
            {!isShow && itemSelect &&
                <div onClick={handleShow} className="px-4 flex flex-row w-full justify-between items-center w-44 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100">
                    <p className="py-2 text-md text-gray-700 dark:text-gray-200 block">{itemSelect}</p>
                    <svg className="text-gray-700 w-6 h-6" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
            }
            {isShow &&
                <div onClick={handleShow} className="bg-white border border-gray-200 rounded-lg shadow-md">

                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDividerButton">
                        {items?.map((item, i) =>
                            <li key={i}>
                                {itemSelect !== item.name && <p onClick={() => handleSetState(item)} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{item.name}</p>}
                            </li>
                        )}
                    </ul>
                </div>}
        </div>
    );
}
