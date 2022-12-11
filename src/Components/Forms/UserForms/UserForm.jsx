import React from 'react';
import { useFormik } from 'formik';
import { FaUser } from 'react-icons/fa';
import {
    FormLabel,
    FormButton,
    FormInput,
    ErrorMessage,
    PreviewImage,
} from './FormComponents';
import { useNavigate } from 'react-router-dom';

function UserForm({ title, validationSchema, buttonTitle, modify = false }) {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            avatar: null,
        },
        validationSchema,
        onSubmit: async userData => {
            console.log('enviando');
            // try {
            //     if (!modify) {
            //         await usersApi.post('/', userData);
            //         navigate('/');
            //         //notificacion: usuario fue creado con exito!
            //     } else {
            //         const { firstName, lastName, avatar, email, password } =
            //             userData;

            //         // Validacion para ver si ninguno de los campos se ha modificado
            //         if ((firstName, lastName, avatar, email, password)) {
            //         }

            //         // Validacion de datos ya creados, y demas validaciones

            //         await usersApi.put('/:id', userData);
            //         //notificacion: usuario fue actualizado con exito!
            //     }
            // } catch (error) {
            //     // Aca deberia mostrar las notificaciones con el respectivo error
            //     console.error(error);
            // }
        },
    });

    return (
        <form className='w-full max-w-lg' onSubmit={formik.handleSubmit}>
            <div className='flex justify-between'>
                <h1 className='flex items-center gap-2 uppercase tracking-wide text-xl font-semibold text-gray-700 mb-10'>
                    <FaUser /> {title}
                </h1>
            </div>
            <div className='flex flex-wrap -mx-3 mb-6'>
                <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                    <FormLabel htmlFor='firstName'>First Name</FormLabel>

                    <FormInput
                        id='firstName'
                        name='firstName'
                        type='text'
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                        formikError={formik.errors.firstName}
                        placeholder='Jane'
                    />
                    {formik.values.firstName.length > 0 &&
                        formik.errors.firstName && (
                            <ErrorMessage msg={formik.errors.firstName} />
                        )}
                </div>
                <div className='w-full md:w-1/2 px-3'>
                    <FormLabel htmlFor='lastName'>Last Name</FormLabel>
                    <FormInput
                        id='lastName'
                        name='lastName'
                        type='text'
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                        formikError={formik.errors.lastName}
                        placeholder='Doe'
                    />
                    {formik.values.lastName.length > 0 &&
                        formik.errors.lastName && (
                            <ErrorMessage msg={formik.errors.lastName} />
                        )}
                </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-6'>
                <div className='w-full px-3'>
                    <FormLabel htmlFor='email'>Email</FormLabel>
                    <FormInput
                        id='email'
                        name='email'
                        type='email'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        formikError={formik.errors.email}
                        placeholder='jondoe@email.com'
                    />
                    {formik.values.email.length > 0 && formik.errors.email && (
                        <ErrorMessage msg={formik.errors.email} />
                    )}
                </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-6'>
                <div className='w-full px-3'>
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <FormInput
                        id='password'
                        name='password'
                        type='password'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        formikError={formik.errors.password}
                        placeholder='******************'
                    />
                    {formik.values.password.length > 0 &&
                        formik.errors.password && (
                            <ErrorMessage msg={formik.errors.password} />
                        )}
                </div>
            </div>
            <div>
                <FormLabel htmlFor='avatar'>
                    Avatar <small>(Optional)</small>
                </FormLabel>
                <FormLabel labelButton={true} htmlFor='avatar'>
                    Select File
                </FormLabel>
                <FormInput
                    id='avatar'
                    type='file'
                    name='avatar'
                    onChange={e =>
                        formik.setFieldValue('avatar', e.target.files[0])
                    }
                    invisible={true}
                />
                <div className='justify-center'>
                    {formik.values.avatar && (
                        <PreviewImage
                            file={formik.values.avatar}
                            onClick={() => formik.setFieldValue('avatar', '')}
                        />
                    )}
                    {formik.values.avatar && formik.errors.avatar && (
                        <ErrorMessage msg={formik.errors.avatar} />
                    )}
                </div>
            </div>
            <div className='flex justify-center mt-10'>
                <FormButton className='flex items-center gap-1' type='submit'>
                    <FaUser />
                    {buttonTitle}
                </FormButton>

                <button
                    className='flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded'
                    type='button'
                    onClick={formik.handleReset}
                >
                    Clear Form
                </button>
            </div>
        </form>
    );
}

export default UserForm;
