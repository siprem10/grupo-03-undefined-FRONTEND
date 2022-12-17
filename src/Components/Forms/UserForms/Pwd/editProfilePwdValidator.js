import * as Yup from 'yup';

export default {
  title: 'Actualizar Usuario',
  validationSchema: Yup.object({
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
  })
};
