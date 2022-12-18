import * as Yup from 'yup';

export default {
  title: 'Editar Usuario',
  validationSchema: Yup.object({
    image: Yup.lazy(value => {

      if (!value || (typeof (value) === "string" && value.includes("http"))) {
        return Yup.mixed().optional();
      }

      return Yup.mixed()
        .test(
          'FILE_TYPE',
          'Archivo inválido! Debe ser una imagen png/jpg',
          value => value && ['image/png', 'image/jpeg', 'image/jpg'].includes(value.type)
        );
    }),    
  })
};
