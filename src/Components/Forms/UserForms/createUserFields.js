import * as Yup from 'yup';

export default {
    title: 'Create User:',
    validationSchema: Yup.object({
        firstName: Yup.string().required('Debe escribir su nombre'),
        lastName: Yup.string().required('Debe escribir su apellido'),
        email: Yup.string()
            .email('Email inválido')
            .required('Debe escribir su email'),
        password: Yup.string()
            .min(8, 'Debe tener al menos 8 caracteres')
            .required('Debe escribir su contraseña'),
        repeatPassword: Yup.string().oneOf(
            [Yup.ref('password')],
            'Las contraseñas no coinciden'
        ),
        avatar: Yup.lazy(value => {
            if (value === null || value === undefined) {
                return Yup.mixed().optional();
            }
            return Yup.mixed()
                .test(
                    'FILE_SIZE',
                    'Demasiado grande!',
                    value => value && value.size < 1024 * 1024
                )
                .test(
                    'FILE_TYPE',
                    'Tipo de archivo inválido! Debe ser una imagen con extensión png o jpg/jpeg',
                    value =>
                        value &&
                        ['image/png', 'image/jpeg'].includes(value.type)
                );
        }),
    }),
    buttonTitle: 'Sign Up',
};
