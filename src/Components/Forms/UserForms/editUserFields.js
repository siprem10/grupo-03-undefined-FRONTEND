import * as Yup from 'yup';

Yup.lazy();

export default {
    title: 'Edit User:',
    validationSchema: Yup.object({
        firstName: Yup.lazy(value => {
            if (value === '' || value === undefined) {
                return Yup.mixed().optional();
            }
            return Yup.string();
        }),
        lastName: Yup.lazy(value => {
            if (value === '' || value === undefined) {
                console.log('value', value);
                return Yup.mixed().optional();
            }
            return Yup.string();
        }),

        email: Yup.lazy(value => {
            if (value === '' || value === undefined) {
                return Yup.mixed().optional();
            }
            return Yup.string().email('Email inválido');
        }),

        password: Yup.lazy(value => {
            if (value === '' || value === undefined) {
                return Yup.mixed().optional();
            }
            return Yup.string().min(8, 'Debe tener al menos 8 caracteres');
        }),

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
    buttonTitle: 'Update User',
};
