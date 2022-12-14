import React from 'react';
 import { Formik } from 'formik';
 import BaseButton from '../BaseButton/BaseButton';
import { useState } from 'react';
 
 const TransactionsForm = ({
    title,
    userAccount,
    categoriesList,
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
            className='title text-4xl mb-1 text-left'
            >{title}</h1>
            <p
            className='mb-2 text-gray-700 text-xl font-bold text-left'
            >{userAccount}</p>
            <Formik
            initialValues={{ 
                amount: 0, 
                description: '',
                category: '' 
            }}
            onSubmit={(values, {resetForm}) => {
                onSubmit(values);
                resetForm({
                    values: ''
                })
                setSuccess(true)
                setTimeout(() => setSuccess(false), 3000)
            }}
            validate={(values) => {
                let errors = {}
                const { amount, category } = values
                if(!amount || amount === '0') {
                    errors.amount = 'Por Favor agreaga un monto'
                } else if(!/(^\d{1,3}(\.?\d{3})*(,\d{2})?$)|(^\d{1,3}(,?\d{3})*(\.\d{2})?$)/.test(amount)) {
                    errors.amount = 'Formato incorrecto'
                }
                if(!category) {
                    errors.category = 'Debes incluir una categoría'
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
                <label className='label' htmlFor='amount'>Cantidad</label>
                <input
                    className='inputForm'
                    type="text"
                    name="amount"
                    placeholder='Cantidad'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.amount}
                />
                {touched.amount && errors.amount && <p className='inputFormErr'>{errors.amount}</p>}
                </div>
                <div className='mb-2'>
                <label className='label' htmlFor='name'>Categoría</label>
                <select 
                id="category" 
                name="category" 
                className='inputForm'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.category}
                >
                    <option disabled value="">Categoría</option>
                    {categoriesList.map( (category, i) => (
                        <option key={i} value={category}>{category}</option>
                        ))}
                </select>
                {touched.category && errors.category && <p className='inputFormErr'>{errors.category}</p>}
                </div>
                <div className='mb-2'>
                <label className='label' htmlFor='name'>Descripción</label>
                <textarea
                    className={`mb-1 shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none resize-none h-20`}
                    name="description"
                    placeholder='Description'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                />
                </div>
                <BaseButton
                text={buttonText}
                type="submit" 
                // disabled={isSubmitting} 
                />
                {success && <p className='text-green-600 font-bold text-center mt-2'>{successText}</p>}

                </form>
            )}
            </Formik>
            </div>
 )};
 
 export default TransactionsForm;