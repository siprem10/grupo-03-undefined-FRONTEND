import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/actions/authActions';
import { setImgUserErr } from '../../Utils/ImgErr';
import avatar_default from "../../assets/user/avatar_default.png";

export default function SessionDropdown() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { status, userData } = useSelector(state => state.auth);
  const authenticated = status === 'success' && Object.keys(userData).length;

  const items = [
    { name: 'Mi perfil', to: '/profile' },
    {
      name: 'Cerrar sesión',
      onClick: () => {
        dispatch(logout());
      }
    }
  ];

  if (userData.roleId === 1) {
    items.push({ name: 'Panel admin', to: '/admin-panel' });
  }

  function handleShow() {
    if (!authenticated) {
      return navigate("/login");
    }
    setIsOpen(!isOpen);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <div className="flex justify-center">

      {authenticated ?
        <button
          onClick={handleShow}
          id="dropdownDividerButton"
          data-dropdown-toggle="dropdownDivider"
          className="bg-opacity-0 sm:bg-primary sm:hover:bg-emerald-700 text-white focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-full sm:rounded-lg text-sm sm:px-3.5 sm:py-2.5 text-center inline-flex items-center"
          type="button">
          <img
            className="anim shadow rounded-full h-12 w-12 sm:h-10 sm:w-10 border border-emerald-900"
            src={userData.avatar ?? avatar_default}
            onError={setImgUserErr}
            alt="img found"
          />
          <span className='hidden sm:flex ml-2'>{userData.firstName ?? ''}</span>
          <svg
            className="ml-2 w-4 h-4 hidden sm:flex"
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
        </button>
        :
        <button
          onClick={handleShow}
          id="dropdownDividerButton"
          data-dropdown-toggle="dropdownDivider"
          className="bg-primary bg-base hover:bg-emerald-700 text-white focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-3.5 py-2.5 text-center inline-flex items-center"
          type="button">
          <span className='anim md:p-1 p-0.5'>Iniciar Sesión</span>
        </button>
      }

      {isOpen &&
        <div
          className={'z-10 top-[66px] right-[6px] xs:top-[75px] xs:right-auto md:top-[75px] absolute border border-emerald-500 bg-white rounded divide-y divide-gray-100 shadow'
          }>
          <ul
            className="py-1 text-sm text-gray-700"
            aria-labelledby="dropdownDividerButton">
            {items?.map((item, i) => (
              <li key={i} onClick={handleClose}>
                {item.to && (
                  <Link
                    to={item.to}
                    className="block py-2 px-4 hover:bg-gray-100">
                    {item.name}
                  </Link>
                )}
                {item.onClick && (
                  <p
                    onClick={item.onClick}
                    className="cursor-pointer block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    {item.name}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>}
    </div >
  );
}
