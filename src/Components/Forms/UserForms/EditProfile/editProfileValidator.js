import * as Yup from 'yup';

export default {
  title: 'Editar Usuario',
  validationSchema: Yup.object({    
    firstName: Yup.lazy(value => {
      if (!value) {
        return Yup.string().required("Nombre requerido");
      }

      return Yup.string()
        .min(3, `Nombre muy corto ${value.length}/3`)
        .max(20, `Nombre muy largo ${value.length}/20`)
        .matches(/^[A-Za-z ]*$/, "Nombre inválido");

    }),
    lastName: Yup.lazy(value => {
      if (!value) {
        return Yup.string().required("Apellido requerido");
      }
      
      return Yup.string()
        .min(3, `Apellido muy corto ${value.length}/3`)
        .max(20, `Apellido muy largo ${value.length}/20`)
        .matches(/^[A-Za-z ]*$/, "Apellido inválido");
    })
  })
};
