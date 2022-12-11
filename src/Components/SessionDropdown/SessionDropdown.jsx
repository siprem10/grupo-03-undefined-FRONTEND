import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/actions/authActions";
import { setImgUserErr } from "../../Utils/ImgErr";

export default function SessionDropdown() {

    const dispatch = useDispatch();
    const navigate = useNavigate();    
    const [isOpen, setIsOpen] = useState(false);
    const { userData } = useSelector(state => state.auth);

    const items = [
        { name: "Mi perfil", to: "/user-info" },
        { name: "Cerrar sesión", onClick: () => {
                dispatch(logout());
                navigate("/login");
            } 
        },
    ];

    if(userData.roleId === 1){
        items.push({ name: "Panel admin", to: "/admin-panel" });
    }

    function handleShow(e){
        setIsOpen(!isOpen);
        e.stopPropagation();
    }

    return (
        <div className="flex justify-center">
            <button
                onClick={handleShow}
                id="dropdownDividerButton"
                data-dropdown-toggle="dropdownDivider"
                className="text-white bg-emerald-900 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button">
                <img src={userData.avatar ?? "err"} onError={(e) => setImgUserErr(e)} alt="img found" className="shadow rounded-full h-10 border-none mr-2" />
                {userData.firstName ?? "Dropdown"}

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
                        d="M19 9l-7 7-7-7">
                    </path>
                </svg>
            </button>

            <div
                style={{top: "70px" }}
                className={!isOpen ? "hidden" : "absolute border border-emerald-500 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"}>
                <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDividerButton">
                    {items?.map((item, i) =>
                        <li key={i}>
                            {item.to && <Link to={item.to} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{item.name}</Link>}
                            {item.onClick && <p onClick={item.onClick} className="cursor-pointer block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{item.name}</p>}
                        </li>
                    )}

                </ul>
            </div>
        </div>

    );
}