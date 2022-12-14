import React from 'react';
import Layout from '../Components/Layout/Layout';
import TransactionsForm from '../Components/Forms/TransactionsForm';

const EditTransactions = () => {
  return (
    <Layout>
        <TransactionsForm 
                title='Editar Transaccion'
                userAccount='User Account'
                buttonText='Editar'
                categoriesList={['awd', 'dwa', 'eoljgkn']}
                onSubmit={(data)=> console.log(data)}
                successText='Editado con exito'
                />
    </Layout>
  )
}

export default EditTransactions;