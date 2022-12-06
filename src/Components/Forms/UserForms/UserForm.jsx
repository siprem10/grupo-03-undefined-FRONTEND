import React from 'react';
import { useFormik } from 'formik';
import { FaUser } from 'react-icons/fa';

function UserForm({ title, validations, onSubmit, buttonTitle }) {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            avatar: '',
        },
        validationSchema: validations,
        onSubmit,
    });

    return (
        <form className='w-full max-w-lg' onSubmit={formik.handleSubmit}>
            <h1 className='flex items-center gap-2 uppercase tracking-wide text-xl font-semibold text-gray-700 mb-10'>
                <FaUser /> {title}
            </h1>
            <div className='flex flex-wrap -mx-3 mb-6'>
                <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                    <label
                        className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                        htmlFor='firstName'
                    >
                        First Name
                    </label>
                    <input
                        className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-teal-500'
                        id='firstName'
                        name='firstName'
                        type='text'
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                        placeholder='Jane'
                    />
                </div>
                <div className='w-full md:w-1/2 px-3'>
                    <label
                        className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                        htmlFor='lastName'
                    >
                        Last Name
                    </label>
                    <input
                        className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-teal-500'
                        id='lastName'
                        name='lastName'
                        type='text'
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                        placeholder='Doe'
                    />
                </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-6'>
                <div className='w-full px-3'>
                    <label
                        className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                        htmlFor='email'
                    >
                        Email
                    </label>
                    <input
                        className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-teal-500'
                        id='email'
                        name='email'
                        type='email'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        placeholder='jondoe@email.com'
                    />
                </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-6'>
                <div className='w-full px-3'>
                    <label
                        className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                        htmlFor='password'
                    >
                        Password
                    </label>
                    <input
                        className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-teal-500'
                        id='password'
                        name='password'
                        type='password'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        placeholder='******************'
                    />
                </div>
            </div>
            <div>
                <label
                    className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                    htmlFor='avatar'
                >
                    Avatar
                </label>
                <button
                    className='flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded'
                    type='button'
                >
                    Upload Image
                </button>
            </div>
            <div className='flex justify-center mt-10'>
                <button
                    className='flex items-center gap-1 flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded'
                    type='submit'
                >
                    <FaUser />
                    {buttonTitle}
                </button>
                <button
                    className='flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded'
                    type='button'
                >
                    Clear Form
                </button>
            </div>
        </form>
    );
}

export default UserForm;
