import { useState } from "react";
import { useDispatch } from "react-redux";
import { setFiltered } from "../../../redux/actions/transactionActions";

export default function Filter({ currentFilter, className }) {

    const dispatch = useDispatch();
    const [isShow, setShow] = useState(false);
    const items = [
        { as: "", name: "Todos", onClick: () => setFilter("") },
        { as: "Ingreso", name: "Ingresos", onClick: () => setFilter("Ingreso") },
        { as: "Egreso", name: "Egresos", onClick: () => setFilter("Egreso") },
    ]

    function setFilter(filter) {
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
            <span onClick={handleShow} className="p-2 items-center flex text-primary">Filtrar
                <svg
                    className="-rotate-90 ml-2 w-4 h-4"
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
                <h1 className="ml-2 px-2 text-primary rounded-full border border-emerald-700">{currentFilter ? currentFilter + "s" : "Todos"}</h1>
            </span>
            {isShow &&
                <div
                    className={'flex items-center absolute ml-[80px] border border-emerald-700 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600'
                    }>
                    <ul
                        className="relative flex flex-row text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownDividerButton">
                        {items?.map((item, i) => (
                            <li key={i} onClick={handleClose}>
                                {currentFilter !== item.as &&
                                    <p
                                        onClick={item.onClick}
                                        className="cursor-pointer block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        {item.name}
                                    </p>
                                }
                            </li>
                        ))}
                    </ul>
                </div>}
        </div>
    );
}
