import React from 'react';
import Layout from '../Components/Layout/Layout';
import CategoriesForm from '../Components/Forms/CategoriesForm';

const CreateCategories = () => {
  return (
    <Layout>
        <CategoriesForm 
                title='Nueva Categoria'
                userAccount='User Account'
                buttonText='Crear'
                onSubmit={(data)=> console.log(data)}
                successText='Creado con exito'
                />
    </Layout>
  )
}

export default CreateCategories;