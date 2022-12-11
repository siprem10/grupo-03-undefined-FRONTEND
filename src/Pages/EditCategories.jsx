import React from 'react';
import Layout from '../Components/Layout/Layout';
import CategoriesForm from '../Components/Forms/CategoriesForm';

const EditCategories = () => {
  return (
    <Layout>
        <CategoriesForm 
                title='Editar Categoría'
                userAccount='User Account'
                buttonText='Editar'
                onSubmit={(data)=> console.log(data)}
                successText='Editado con exito'
                />
    </Layout>
  )
}

export default EditCategories;