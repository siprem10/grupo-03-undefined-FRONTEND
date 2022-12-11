import React from 'react';
import Layout from '../Components/Layout/Layout';
import TransactionsForm from '../Components/Forms/TransactionsForm';

const CreateTransactions = () => {
  return (
    <Layout>
        <TransactionsForm 
                title='Nueva Transaccion'
                userAccount='User Account'
                buttonText='Crear'
                categoriesList={['awd', 'dwa', 'eoljgkn']}
                onSubmit={(data)=> console.log(data)}
                successText='Creado con exito'
                />
    </Layout>
  )
}

export default CreateTransactions;