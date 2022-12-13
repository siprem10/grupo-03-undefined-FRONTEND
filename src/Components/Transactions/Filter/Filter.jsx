import { useState } from "react";
import { useDispatch } from "react-redux";
import { setFiltered } from "../../../redux/actions/transactionActions";

export default function Filter({ className }) {

    const dispatch = useDispatch();
    const [isShow, setShow] = useState(false);
    const items = [
        {name: "Todos", onClick: () => setFilter("")},
        {name: "Ingresos", onClick: () => setFilter("Ingreso")},
        {name: "Egresos", onClick: () => setFilter("Egreso")},
    ]

    function setFilter(filter){
        dispatch(setFiltered(filter));
    }

    function handleShow() {
        setShow(!isShow);
    }
    
    function handleClose() {
        setShow(false);
    }

    return (
        <div className={`cursor-pointer ${className ?? ""}`}>
            <span onClick={handleShow} className="p-2 items-center flex text-primary">Filtros
                <svg
                    className="ml-2 w-4 h-4"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"></path>
                </svg>
            </span>
            {isShow &&
                <div
                    className={'left-1 relative border border-emerald-500 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600'
                    }>
                    <ul
                        className="flex flex-row text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownDividerButton">
                        {items?.map((item, i) => (
                            <li key={i} onClick={handleClose}>
                            <p
                                onClick={item.onClick}
                                className="cursor-pointer block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                {item.name}
                            </p>
                            </li>
                        ))}
                    </ul>
                </div>}
        </div>
    );
}
