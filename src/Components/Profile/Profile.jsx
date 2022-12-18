import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import ModalModifyProfile from '../ModalModifyProfile/ModalModifyProfile';
import ModalModifyProfilePwd from '../ModalModifyProfilePwd/ModalModifyProfilePwd';
import { GoVerified } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { HttpService } from '../../Service/HttpService';
import { logout } from '../../redux/actions/authActions';
import defaultAvatar from '../../assets/user/avatar_default.png';
import BudgetChart from '../Graphs/PieChart/PieChart';
import BaseButton from '../BaseButton/BaseButton';
import { alertAdvert } from '../../Utils/UI';
import ModalModifyImage from '../ModalModifyImage/ModalModifyImage';

function Profile() {
  const [modifyProfile, setModifyProfile] = useState(false);
  const [modifyPwd, setModifyPwd] = useState(false);
  const [modifyImage, setModifyImage] = useState(false);

  const userData = useSelector(state => state.auth.userData);
  const dispatch = useDispatch();

  const openModalProfile = (show = true) => setModifyProfile(show);
  const openModalPwd = (show = true) => setModifyPwd(show);
  const openModalImage = (show = true) => setModifyImage(show);

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
        <div className="flex justify-center w-[90%] xs:w-[420px]">
          {/* Modal para modificar el perfil */}
          {modifyProfile &&
            <ModalModifyProfile closeModal={() => openModalProfile(false)} />
          }
          {modifyPwd &&
            <ModalModifyProfilePwd closeModal={() => openModalPwd(false)} />
          }
          {modifyImage &&
            <ModalModifyImage closeModal={() => openModalImage(false)} />
          }
          <div className="flex flex-col w-[100%] gap-5 bg-white dark:bg-gray-800 dark:border-gray-700 text-black rounded-lg p-10">
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
            <div className="flex flex-col gap-2 wrap">
              <BaseButton text="Editar Cuenta" onClick={openModalProfile} />
              <BaseButton text="Cambiar imagen" onClick={openModalPwd} />
              <BaseButton text="Cambiar Contraseña" onClick={openModalPwd} />
              <BaseButton className="redButton" text="Borrar cuenta" onClick={deleteAccount} />
            </div>
          </div>
        </div>
        <BudgetChart />
      </div>
    </Layout>
  );
}

export default Profile;
