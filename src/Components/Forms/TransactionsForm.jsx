import React from 'react';
 import { Formik } from 'formik';
 import Layout from '../../Layout/Layout';
 import BaseButton from '../BaseButton/BaseButton';
 
 const TransactionsForm = () => {


   return (
            <div
            className='flex flex-col w-screen items-center justify-center'
            >
            <h1
            className='text-4xl text-left w-6/12'
            >NUEVA TRANSACCION</h1>
            <p
            className='text-m mb-3 text-left w-6/12'
            >Cuenta de Usuario</p>
            <Formik
            initialValues={{ 
                amount: 0, 
                description: '',
                category: '' 
            }}
            onSubmit={(values, {resetForm}) => {
                console.log(values);
                resetForm({
                    values: ''
                })
            }}
            validate={(values) => {
                let errors = {}
                const { amount, category } = values
                if(!amount) {
                    errors.amount = 'Por Favor agreaga un monto'
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
                isSubmitting,
                /* and other goodies */
            }) => (
                <form 
                className='flex flex-col w-6/12'
                onSubmit={handleSubmit}
                >
                <input
                    className={`${touched.amount && errors.amount && 'border-red-500 bg-red-100'} rounded border my-2 px-5 py-2 w-full`}
                    type="number"
                    name="amount"
                    placeholder='Amount'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.amount}
                />
                {touched.amount && errors.amount && <p className='text-red-600'>{errors.amount}</p>}
                <select 
                id="category" 
                name="category" 
                className={`${touched.category && errors.category && 'border-red-500 bg-red-100'} rounded border my-1 px-5 py-2 mb-3 w-full`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.category}
                >
                    <option disabled value="">Categoría</option>
                    <option value="educacion">Educacion</option>
                    <option value="alimentos">Alimentos</option>
                    <option value="limpieza">Limpieza</option>
                    <option value="ocio">Ocio</option>
                </select>
                {touched.category && errors.category && <p className='text-red-600'>{errors.category}</p>}
                <textarea
                    className='rounded border my-1 px-5 py-2 mb-3 resize-none h-24 w-full'
                    name="description"
                    placeholder='Description'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                />
                <BaseButton
                text='Enviar'
                type="submit" 
                // disabled={isSubmitting} 
                />


                </form>
            )}
            </Formik>
            </div>
 )};
 
 export default TransactionsForm;