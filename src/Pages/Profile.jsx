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

function Profile() {
    const [modifyProfile, setModifyProfile] = useState(false);
    const userData = useSelector(state => state.auth.userData);
    const dispatch = useDispatch();

    console.log('userData', userData);
    console.log('HttpService', HttpService);

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
        premium: 'Premium',
        standard: 'Standard',
    };

    return (
        <Layout>
            <div className='flex gap-32'>
                {/* Modal para modificar el perfil */}
                {modifyProfile && (
                    <ModifyProfile
                        closeModalWithoutConfirmation={
                            closeModalWithoutConfirmation
                        }
                        closeModal={() => confirmationModal(false)}
                    />
                )}
                <div className='flex flex-col gap-5 bg-white text-black rounded-lg p-10 px-32 backdrop-blur-2xl'>
                    {/* Profile Image*/}
                    <img
                        className='self-center rounded-full shadow-md shadow-black border-4 border-teal-600 border-spacing-x-60'
                        width={150}
                        src={userData.avatar}
                        alt={userData.firstName}
                    />
                    <h1 className='font-bold text-xl text-center'>
                        Datos del Usuario
                    </h1>
                    <div className='flex justify-center items-center gap-1'>
                        <p className='text-center font-medium text-lg'>
                            {userData.firstName}
                        </p>
                        <GoVerified size={16} color={'green'} />
                    </div>
                    <ButtonProfile
                        className='bg-green-400 hover:bg-green-500 border-green-400 hover:border-green-500 font-semibold text-primary'
                        onClick={openModal}
                    >
                        <AiFillEdit size={20} />
                        Editar Cuenta
                    </ButtonProfile>
                    <ButtonProfile
                        className='bg-error hover:bg-red-500 border-error hover:border-red-500 font-semibold text-white'
                        onClick={deleteAccount}
                    >
                        <AiOutlineDelete size={20} />
                        Eliminar Cuenta
                    </ButtonProfile>
                    {/* Datos del Usuario*/}
                    <div className='flex gap-2'>
                        <p className='items-center rounded-lg font-bold'>
                            Nombre:
                        </p>
                        <p>{userData.firstName}</p>
                    </div>

                    <div className='flex gap-2'>
                        <p className='items-center rounded-lg font-bold'>
                            Apellido:
                        </p>
                        <p>{userData.lastName}</p>
                    </div>

                    <div className='flex gap-2'>
                        <p className='items-center rounded-lg font-bold'>
                            Rol de Usuario:
                        </p>
                        <p>
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

                    <div className='flex gap-2'>
                        <p className='items-center rounded-lg font-bold'>
                            Puntos:
                        </p>
                        <p>{userData.points === null ? 0 : userData.points}</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Profile;
