import * as Yup from 'yup';

export default {
  title: 'Editar Usuario',
  validationSchema: Yup.object({
    image: Yup.lazy(value => {
      if (!value || (typeof(value) === "string" && value.includes("http"))) {
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
        
      return Yup.string().min(3, 'Nombre inválido');
      
    }),
    lastName: Yup.lazy(value => {
      if (!value) {        
        return Yup.string().required("Apellido requerido");
      }
      return Yup.string().min(3, 'Apellido inválido');
    }),

    currentPassword: Yup.lazy(value => {
      if (!value) {
        return Yup.string().required("Contraseña actual requerida");
      }      
      return Yup.mixed().optional();
    }),

    newPassword: Yup.lazy(value => {
      if (!value) {
        return Yup.string().required("Contraseña nueva requerida");
      }
      return Yup.string().min(8, 'Debe tener al menos 8 caracteres');
    }),

    repeatPassword: Yup.lazy(value => {
      if (!value) {
        return Yup.string().required("Confirmación requerida");
      }
      return Yup.string().oneOf([Yup.ref('newPassword')], 'Las contraseñas no coinciden');
    })
  }),
  buttonTitle: 'Actualizar Usuario'
};
