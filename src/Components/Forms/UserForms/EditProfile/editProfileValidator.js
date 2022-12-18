import * as Yup from 'yup';

export default {
  title: 'Editar Usuario',
  validationSchema: Yup.object({    
    firstName: Yup.lazy(value => {
      if (!value) {
        return Yup.string().required("Nombre requerido");
      }

      return Yup.string()
        .matches(/^[A-Za-z ]*$/, "Nombre inválido")
        .min(3, `Nombre corto ${value.length}/3`)
        .max(20, `Nombre largo ${value.length}/20`);

    }),
    lastName: Yup.lazy(value => {
      if (!value) {
        return Yup.string().required("Apellido requerido");
      }
      
      return Yup.string()
        .matches(/^[A-Za-z ]*$/, "Apellido inválido")
        .min(3, `Apellido corto ${value.length}/3`)
        .max(20, `Apellido largo ${value.length}/20`);
    })
  })
};
