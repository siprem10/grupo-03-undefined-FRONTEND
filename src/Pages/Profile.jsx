import React, { useState } from 'react';
import Layout from '../Components/Layout/Layout';
import { ButtonProfile } from '../Components/Buttons';
import { AiOutlineDelete, AiFillEdit } from 'react-icons/ai';
import ModifyProfile from '../Components/ModifyProfile';
import { GoVerified } from 'react-icons/go';
import { confirmationAlert } from '../Utils/Alerts';
import { useDispatch, useSelector } from 'react-redux';
import { HttpService } from '../Service/HttpService';
import { logout } from '../redux/actions/authActions';
import defaultAvatar from '../assets/user/avatar_default.png';
import BudgetChart from '../Components/Graphs/PieChart/PieChart';

function Profile() {
  const [modifyProfile, setModifyProfile] = useState(false);
  const userData = useSelector(state => state.auth.userData);
  const dispatch = useDispatch();

  const openModal = () => setModifyProfile(true);
  const closeModalWithoutConfirmation = () => setModifyProfile(false);

  const confirmationModal = boolean => {
    const confirmation = result => {
      if (result.isConfirmed) {
        setModifyProfile(boolean);
      }
    };

    confirmationAlert(
      'Estas seguro de que quiere salir?',
      'Los cambios no seran guardados',
      true,
      'No quiero modificar el perfil',
      confirmation
    );
  };

  const deleteAccount = () => {
    const httpService = new HttpService();

    const confirmation = async result => {
      if (result.isConfirmed) {
        await httpService.apiPrivate().delete(`/users/${userData.id}`);
        dispatch(logout());
        window.location.href('/');
      }
    };

    confirmationAlert(
      'Estas seguro de que quiere eliminar su cuenta?',
      '',
      true,
      'Si quiero eliminar mi cuenta',
      confirmation
    );
  };

  const roles = {
    admin: 'Administrador',
    standard: 'Standard'
  };

  return (
    <Layout>
      <div className='flex flex-col lg:flex-row gap-5'>
        <div className="flex justify-center">
          {/* Modal para modificar el perfil */}
          {modifyProfile && (
            <ModifyProfile
              closeModalWithoutConfirmation={closeModalWithoutConfirmation}
              closeModal={() => confirmationModal(false)}
            />
          )}
          <div className="flex flex-col gap-5 bg-white dark:bg-gray-800 dark:border-gray-700 text-black rounded-lg p-10 px-32 backdrop-blur-2xl">
            {/* Profile Image*/}
            <img
              className="h-36 w-36 rounded-full self-center shadow-md shadow-black border-4 border-teal-600 border-spacing-x-60"
              src={userData.avatar || defaultAvatar}
              alt={userData.firstName}
            />
            <div className="flex justify-center items-center gap-1">
              <p className="text-center font-medium text-xl dark:text-white">{userData.firstName}</p>
              <GoVerified size={16} color={'green'} />
            </div>
            {/* Datos del Usuario*/}
            <h1 className="font-bold text-xl text-center text-gray-500">Datos del Usuario</h1>

            {/* Nombre */}
            <div className="flex flex-col gap-2 items-center justify-center py-2">
              <p className="items-center rounded-lg font-bold text-sm leading-3 text-gray-500">
                Nombre completo
              </p>
              <p className="leading-3 text-xl dark:text-white">
                {userData.firstName} {userData.lastName}
              </p>
            </div>

            {/* Email  */}
            <div className="flex flex-col gap-2 justify-center items-center py-2">
              <p className="items-center rounded-lg font-bold text-sm leading-3 text-gray-500">
                Correo
              </p>
              <p className="leading-3 dark:text-white">{userData.email}</p>
            </div>

            {/* Rol  */}
            <div className="flex flex-col gap-2 justify-center items-center py-2">
              <p className="items-center rounded-lg font-bold text-sm leading-3 text-gray-500">Rol</p>
              <p className="leading-3 dark:text-white">
                {userData.roleId === 1
                  ? roles.admin
                  : userData.roleId === 2
                    ? roles.premium
                    : userData.roleId === 3
                      ? roles.standard
                      : userData.roleId === null
                        ? roles.standard
                        : null}
              </p>
            </div>

            <div className="flex gap-3 ">
              <ButtonProfile
                className="bg-green-400 hover:bg-green-500 border-green-400 hover:border-green-500 font-semibold text-primary"
                onClick={openModal}>
                <AiFillEdit size={20} />
                Editar Cuenta
              </ButtonProfile>
              <ButtonProfile
                className="bg-tertiary hover:bg-red-500 border-tertiary hover:border-red-500 font-semibold text-white w-[45px]"
                onClick={deleteAccount}>
                <AiOutlineDelete size={20} />
              </ButtonProfile>
            </div>
          </div>
        </div>
        <div className="self-start flex flex-col gap-5 bg-white dark:bg-gray-800 dark:border-gray-700 text-black rounded-lg p-5 backdrop-blur-2xl">
          <BudgetChart />
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
