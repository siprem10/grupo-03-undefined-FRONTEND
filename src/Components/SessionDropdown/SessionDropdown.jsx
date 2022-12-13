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
      <button
        onClick={handleShow}
        id="dropdownDividerButton"
        data-dropdown-toggle="dropdownDivider"
        className="text-white bg-primary hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-3.5 py-2.5 text-center inline-flex items-center dark:bg-primary dark:hover:bg-tertiary dark:focus:ring-blue-800"
        type="button">

        {authenticated ? (
          <>
            <img
              className="anim shadow rounded-full md:h-10 h-7 border-none mr-2"
              src={userData.avatar ?? avatar_default}
              onError={setImgUserErr}
              alt="img found"
            />
            <span>{userData.firstName ?? ''}</span>
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
          </>)
          : (
            <span className='anim md:p-1 p-0.5'>Iniciar Sesión</span>
          )
        }
      </button>

      {isOpen &&
        <div
          style={{ top: '70px' }}
          className={'t-10 absolute border border-emerald-500 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600'
          }>
          <ul
            className="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDividerButton">
            {items?.map((item, i) => (
              <li key={i} onClick={handleClose}>
                {item.to && (
                  <Link
                    to={item.to}
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
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
