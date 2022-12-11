import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import { ButtonProfile } from '../Components/Buttons';
import { AiOutlineDelete, AiFillEdit } from 'react-icons/ai';
import ModifyProfile from '../Components/ModifyProfile';
import { confirmationAlert } from '../Components/Alerts/Alert';
import { GoVerified } from 'react-icons/go';

function Profile() {
    const [modifyProfile, setModifyProfile] = useState(false);
    const hardcodedUser = {
        firstName: 'Luciano',
        lastName: 'Piñol',
        email: 'luchemma@gmail.com',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/205.jpg',
        roleId: 1,
        points: 400,
    };

    const openModal = () => setModifyProfile(true);

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
        console.log('Eliminando perfil');
    };

    return (
        <Layout>
            <div className='flex gap-32'>
                {/* Modal para modificar el perfil */}
                {modifyProfile && (
                    <ModifyProfile
                        closeModal={() => confirmationModal(false)}
                    />
                )}
                <div className='flex flex-col gap-5 bg-gray-300 rounded-lg p-10 px-32 backdrop-blur-sm'>
                    {/* Profile Image*/}
                    <img
                        className='rounded-full shadow-md shadow-black border-4 border-teal-600 border-spacing-x-60'
                        src={hardcodedUser.avatar}
                        alt={hardcodedUser.firstName}
                    />
                    <h1 className='font-bold text-xl text-center'>
                        Datos del Usuario
                    </h1>
                    <div className='flex justify-center items-center gap-1'>
                        <p className='text-center font-medium text-lg'>
                            {hardcodedUser.firstName}
                        </p>
                        <GoVerified size={16} color={'green'} />
                    </div>
                    <ButtonProfile
                        className='bg-accent hover:bg-orange-300 border-accent hover:border-orange-300 font-semibold text-primary'
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
                        <p>{hardcodedUser.firstName}</p>
                    </div>

                    <div className='flex gap-2'>
                        <p className='items-center rounded-lg font-bold'>
                            Apellido:
                        </p>
                        <p>{hardcodedUser.lastName}</p>
                    </div>

                    <div className='flex gap-2'>
                        <p className='items-center rounded-lg font-bold'>
                            Rol de Usuario:
                        </p>
                        <p>{hardcodedUser.roleId}</p>
                    </div>

                    <div className='flex gap-2'>
                        <p className='items-center rounded-lg font-bold'>
                            Puntos:
                        </p>
                        <p>{hardcodedUser.points}</p>
                    </div>
                </div>
                <div className='flex flex-col gap-5 bg-white rounded-lg'>
                    <h1 className='font-bold text-lg text-center'>Cuentas</h1>
                    <hr />
                </div>
            </div>
        </Layout>
    );
}

export default Profile;
