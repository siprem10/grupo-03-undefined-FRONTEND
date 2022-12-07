import * as Yup from 'yup';
import { usersApi } from '../../../api/usersApi';

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
        avatar: Yup.mixed()
            .test(
                'FILE_SIZE',
                'Demasiado grande!',
                value => value && value.size < 1024 * 1024
            )
            .test(
                'FILE_TYPE',
                'Tipo de archivo inválido! Debe ser una imagen con extensión png o jpg/jpeg',
                value =>
                    value && ['image/png', 'image/jpeg'].includes(value.type)
            ),
    }),
    onSubmit: async userData => {
        try {
            const newUser = await usersApi.post('/', userData);
            console.log('userData', userData);
            console.log(newUser);
        } catch (error) {
            console.error(error);
        }
    },
    buttonTitle: 'Sign Up',
};
