import React, { useState } from 'react';
 import { Formik } from 'formik';
 import BaseButton from '../BaseButton/BaseButton';
 import "../styles/Form.css";
 
 const CategoriesForm = ({ 
    title,
    userAccount,
    buttonText,
    onSubmit,
    successText
  }) => {

    const [ success, setSuccess ] = useState(false)

   return (
            <div
            className='flex flex-col w-screen items-center justify-center'
            >
            <h1
            className='title text-4xl mb-1'
            >{title}</h1>
            <p
            className='mb-2 text-gray-700 text-xl font-bold'
            >{userAccount}</p>
            <Formik
            initialValues={{ 
                name: '', 
                description: ''
            }}
            onSubmit={(values, {resetForm}) => {
                onSubmit(values)
                resetForm({
                    values: ''
                })
                setSuccess(true)
                setTimeout(() => setSuccess(false), 3000)
            }}
            validate={(values) => {
                let errors = {}
                const { name, description } = values
                if(!name) {
                    errors.name = 'Debes ingresar un nombre'
                }
                if(!description) {
                    errors.description = 'Debes ingresar una descripcion'
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
                onSubmit={handleSubmit}
                >
                <div className='mb-2'>
                <label className='label' htmlFor='name'>Nombre</label>
                <input
                    className='inputForm'
                    type="text"
                    name="name"
                    placeholder='Nombre'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                />
                {touched.name && errors.name && <p className='inputFormErr'>{errors.name}</p>}
                </div>
                <div className='mb-2'>
                <label className='label' htmlFor='description'>Descripción</label>
                <textarea
                    className={`mb-1 shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none resize-none h-20`}
                    name="description"
                    placeholder='Descripción'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                />
                {touched.description && errors.description && <p className='inputFormErr'>{errors.description}</p>}
                </div>
                <BaseButton
                text={buttonText}
                type="submit" 
                />
                {success && <p className='text-green-600 font-bold text-center mt-2'>{successText}</p>}
                </form>
            )}
            </Formik>
            </div>
 )};
 
 export default CategoriesForm;