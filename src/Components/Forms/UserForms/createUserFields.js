import * as yup from 'yup';

export default {
    title: 'Create User:',
    validationSchema: yup.object({
        firstName: yup.string().required('Debe escribir su nombre'),
        lastName: yup.string().required('Debe escribir su apellido'),
        email: yup
            .string()
            .email('Email inválido')
            .required('Debe escribir su email'),
        password: yup
            .string()
            .min(8, 'Debe tener al menos 8 caracteres')
            .required('Debe escribir su contraseña'),
        avatar: yup.string(),
    }),
    onSubmit: formData => {
        console.log(formData);
    },
    buttonTitle: 'Sign Up',
};
