import React, { useState } from 'react';
import Layout from '../Components/Layout/Layout';
import ModifyProfile from '../Components/ModifyProfile';
import { GoVerified } from 'react-icons/go';
import { confirmationAlert } from '../Utils/Alerts';
import { useDispatch, useSelector } from 'react-redux';
import { HttpService } from '../Service/HttpService';
import { logout } from '../redux/actions/authActions';
import defaultAvatar from '../assets/user/avatar_default.png';
import BudgetChart from '../Components/Graphs/PieChart/PieChart';
import BaseButton from '../Components/BaseButton/BaseButton';
import { alertAdvert } from '../Utils/UI';
import { useEffect } from 'react';

function Profile() {
  const [modifyProfile, setModifyProfile] = useState(false);
  const userData = useSelector(state => state.auth.userData);
  const dispatch = useDispatch();

  const openModal = () => setModifyProfile(true);
  const closeModalWithoutConfirmation = () => setModifyProfile(false);

  
  // useEffect(() => {
  // }, [dispatch]);

  const confirmationModal = (boolean) => {
    const confirmation = () => {      
      setModifyProfile(boolean);
    };
    
    alertAdvert(confirmation, "Se descartaran los cambios.", "¿Cerrar ventana?");
  };

  const deleteAccount = () => {

    const httpService = new HttpService();

    const confirmation = async () => {
      await httpService.apiPrivate().delete(`/users/${userData.id}`);
      dispatch(logout());
    };

    alertAdvert(confirmation, "¿Borrar cuenta permanentemente?");
  };

  return (
    <Layout>
      <div className='flex flex-row justify-center items-center flex-wrap	gap-5 my-10'>
        <div className="flex justify-center w-fit">
          {/* Modal para modificar el perfil */}
          {modifyProfile && (
            <ModifyProfile
              closeModalWithoutConfirmation={closeModalWithoutConfirmation}
              closeModal={() => confirmationModal(false)}
            />
          )}
          <div className="flex flex-col w-full gap-5 bg-white dark:bg-gray-800 dark:border-gray-700 text-black rounded-lg p-10">
            {/* Profile Image*/}
            <img
              className="h-36 w-36 rounded-full self-center shadow-md shadow-black border-4 border-teal-600 border-spacing-x-60"
              src={userData.avatar || defaultAvatar}
              alt={userData.firstName}
            />
            <div className="flex justify-center items-center gap-1">
              <p className="mb-1 text-center font-medium text-xl dark:text-white">{userData.firstName} {userData.lastName}</p>
              <GoVerified size={16} color={'green'} />
            </div>

            {/* Email  */}
            <div className="flex flex-col gap-2 justify-center items-center">
              <p className="items-center rounded-lg font-bold text-lg leading-3 text-gray-500">
                Correo
              </p>
              <p className="leading-3 dark:text-white">{userData.email}</p>
            </div>

            {/* Rol  */}
            <div className="flex flex-col gap-2 justify-center items-center">
              <p className="items-center rounded-lg font-bold text-lg leading-3 text-gray-500">Rol</p>
              <p className="leading-3 dark:text-white">{userData.Role.name} </p>
            </div>
            <div className="flex gap-3 ">
              <BaseButton text="Editar Cuenta" onClick={openModal} />
              <BaseButton text="Borrar cuenta" onClick={deleteAccount} />
            </div>
          </div>
        </div>
        <BudgetChart />
      </div>
    </Layout>
  );
}

export default Profile;
