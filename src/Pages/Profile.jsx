import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import { ButtonProfile } from '../Components/Buttons';
import { AiOutlineDelete, AiFillEdit } from 'react-icons/ai';
import ModifyProfile from '../Components/ModifyProfile';
import { confirmationAlert } from '../Components/Alerts/Alert';

function Profile() {
    const [modifyProfile, setModifyProfile] = useState(false);
    const hardcodedUser = {
        firstName: 'Luciano',
        lastName: 'Piñol',
        email: 'luchemma@gmail.com',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/620.jpg',
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
            <div className='flex flex-col gap-5'>
                {/* Modal para modificar el perfil */}
                {modifyProfile && (
                    <ModifyProfile
                        closeModal={() => confirmationModal(false)}
                    />
                )}
                {/* Profile Image*/}
                <img
                    className='rounded-full shadow-2xl shadow-black border-indigo-700 border'
                    src={hardcodedUser.avatar}
                    alt={hardcodedUser.firstName}
                />
                <p className='text-center'>{hardcodedUser.firstName}</p>
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
                <p>Nombre:{hardcodedUser.firstName}</p>
                <p>Apellido:{hardcodedUser.lastName}</p>
                <p>Rol del usuario:{hardcodedUser.roleId}</p>
                <p>Puntos:{hardcodedUser.points}</p>
            </div>
        </Layout>
    );
}

export default Profile;
