import React from 'react';
import { Formik } from 'formik';
import BaseButton from '../BaseButton/BaseButton';

const CategoriesForm = ({
    title,
    userAccount,
    buttonText,
    onSubmit
}) => {

    return (
        <div className='flex flex-col w-screen items-center justify-center'>
            <h1 className='text-3xl text-left w-11/12 sm:w-8/12 md:w-6/12 sm:text-4xl'>{title}</h1>
            <p className='text-m mb-3 text-left w-11/12 sm:w-8/12 md:w-6/12'>{userAccount}</p>
            <Formik
                initialValues={{
                    name: '',
                    description: ''
                }}
                onSubmit={(values, { resetForm }) => {
                    onSubmit(values)
                    resetForm({
                        values: ''
                    })
                }}
                validate={(values) => {
                    let errors = {};
                    const { name, description } = values;
                    if (!name) {
                        errors.name = 'Debes ingresar un nombre';
                    }
                    if (!description) {
                        errors.description = 'Debes ingresar una descripcion';
                    }
                    return errors;
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                }) => (
                    <form
                        className='flex flex-col w-11/12 sm:w-8/12 md:w-6/12'
                        onSubmit={handleSubmit}>
                        <input
                            className={`${touched.name && errors.name && 'border-red-500 bg-red-100'} rounded border my-2 px-5 py-2 w-full`}
                            type="text"
                            name="name"
                            placeholder='Nombre'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                        />
                        {touched.name && errors.name && <p className='text-red-600'>{errors.name}</p>}
                        <textarea
                            className={`${touched.description && errors.description && 'border-red-500 bg-red-100'} rounded border my-1 px-5 py-2 mb-2 resize-none h-24 w-full`}
                            name="description"
                            placeholder='Descripción'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}
                        />
                        {touched.description && errors.description && <p className='text-red-600'>{errors.description}</p>}
                        <BaseButton
                            text={buttonText}
                            type="submit"
                        />
                    </form>
                )}
            </Formik>
        </div>
    )
};

export default CategoriesForm;