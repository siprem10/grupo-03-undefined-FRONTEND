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
