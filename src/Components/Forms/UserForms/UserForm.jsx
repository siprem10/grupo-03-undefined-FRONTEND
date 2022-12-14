import React, { useState } from 'react';
import { useFormik } from 'formik';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FormLabel, FormButton, FormInput, ErrorMessage, PreviewImage } from './FormComponents';
import { useDispatch, useSelector } from 'react-redux';
import { alertErr, alertOkClick } from '../../../Utils/UI';
import { updateUserInfo } from '../../../redux/actions/authActions';
import { setUserData } from '../../../redux/slices/authSlice';

function UserForm({
  title,
  validationSchema,
  buttonTitle,
  modify = false,
  closeModalWithoutConfirmation
}) {
  const dispatch = useDispatch();
  const { id, firstName, lastName, email, avatar } = useSelector(user => user.auth.userData);
  const [hidePasswordFields, setHidePasswordFields] = useState(true);

  const formik = useFormik({
    initialValues: {
      firstName,
      lastName,
      email,
      image: avatar,
      currentPassword: '',
      newPassword: '',
      repeatPassword: ''
    },
    validationSchema,
    onSubmit: async userData => {
      try {
        const { firstName, lastName, email, currentPassword, newPassword, image, repeatPassword } =
          userData;

        if (!firstName || !lastName || !email) {
          const camposRequeridos = `${!firstName ? '- Nombre' : ''} ${
            !lastName ? '- Apellido' : ''
          } ${!email ? '- Email' : ''}`;

          return alertErr(camposRequeridos, 'Falta completar los siguientes campos:');
        }

        if ((currentPassword && !newPassword) || (currentPassword && !repeatPassword)) {
          return alertErr('Si desea cambiar la contraseña debe proporcionar una nueva', 'Error');
        }

        if (!currentPassword && newPassword && repeatPassword) {
          return alertErr('Debe introducir su actual contraseña para poder cambiarla', 'Error');
        }

        const filteredData = {
          firstName,
          lastName,
          email,
          image,
          currentPassword,
          newPassword
        };

        dispatch(updateUserInfo(id, filteredData));
        dispatch(setUserData(filteredData));

        alertOkClick(
          closeModalWithoutConfirmation,
          'Se ha modificado el perfil correctamente',
          'Actualizado!'
        );
      } catch (error) {
        console.log('error', error);
        alertErr(error.response.data.error);
      }
    }
  });

  return (
    <form className="w-full max-w-lg" onSubmit={formik.handleSubmit} encType="multipart/form-data">
      <div className="flex justify-between">
        <h1 className="flex items-center gap-2 uppercase tracking-wide text-xl font-semibold text-gray-700">
          <FaUser /> {title}
        </h1>
      </div>
      <div>
        <FormInput
          id="image"
          type="file"
          name="image"
          onChange={e => formik.setFieldValue('image', e.target.files[0])}
          invisible={true}
        />

        <div className="justify-center mb-5">
          {formik.values.image && (
            <PreviewImage
              className="w-32 h-32 rounded-full object-cover"
              file={formik.values.image}
              onClick={() => formik.setFieldValue('image', null)}
            />
          )}
          <div className="flex flex-col items-center justify-center">
            <FormLabel htmlFor="avatar">
              Avatar <small>(Opcional)</small>
            </FormLabel>
            <FormLabel labelButton={true} htmlFor="image">
              Seleccionar Archivo
            </FormLabel>
            {formik.values.image && formik.errors.image && (
              <ErrorMessage msg={formik.errors.image} />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <FormLabel htmlFor="firstName">Nombre</FormLabel>

          <FormInput
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.firstName}
            formikError={formik.errors.firstName}
            placeholder="Jane"
          />
          {formik.values.firstName.length > 0 && formik.errors.firstName && (
            <ErrorMessage msg={formik.errors.firstName} />
          )}
        </div>
        <div className="w-full md:w-1/2 px-3">
          <FormLabel htmlFor="lastName">Apellido</FormLabel>
          <FormInput
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.lastName}
            formikError={formik.errors.lastName}
            placeholder="Doe"
          />
          {formik.values.lastName.length > 0 && formik.errors.lastName && (
            <ErrorMessage msg={formik.errors.lastName} />
          )}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormInput
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            formikError={formik.errors.email}
            placeholder="jondoe@email.com"
          />
          {formik.values.email.length > 0 && formik.errors.email && (
            <ErrorMessage msg={formik.errors.email} />
          )}
        </div>
      </div>
      <FormLabel
        className="mb-10 gap-2"
        labelButton={true}
        onClick={() => setHidePasswordFields(!hidePasswordFields)}>
        <RiLockPasswordFill size={16} />
        Cambiar Contraseña
      </FormLabel>
      {modify && (
        <div className={`flex flex-wrap -mx-3 mb-6 ${hidePasswordFields === true && 'hidden'}`}>
          <div className="w-full px-3">
            <FormLabel htmlFor="currentPassword">Contraseña Actual:</FormLabel>
            <FormInput
              id="currentPassword"
              name="currentPassword"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.currentPassword}
              placeholder="***********"
            />
          </div>
        </div>
      )}
      <div className={`flex flex-wrap -mx-3 mb-6 ${hidePasswordFields === true && 'hidden'}`}>
        <div className="w-full px-3">
          <FormLabel htmlFor="newPassword">Nueva Contraseña</FormLabel>
          <FormInput
            id="newPassword"
            name="newPassword"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.newPassword}
            formikError={formik.errors.newPassword}
            placeholder="***********"
          />
          {formik.values.newPassword.length > 0 && formik.errors.newPassword && (
            <ErrorMessage msg={formik.errors.newPassword} />
          )}
        </div>
      </div>
      <div className={`flex flex-wrap -mx-3 mb-6 ${hidePasswordFields === true && 'hidden'}`}>
        <div className="w-full px-3">
          <FormLabel htmlFor="repeatPassword">Repetir Nueva Contraseña</FormLabel>
          <FormInput
            id="repeatPassword"
            name="repeatPassword"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.repeatPassword}
            formikError={formik.errors.repeatPassword}
            placeholder="***********"
          />
          {formik.values.repeatPassword.length > 0 && formik.errors.repeatPassword && (
            <ErrorMessage msg={formik.errors.repeatPassword} />
          )}
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <FormButton className="flex items-center gap-1" type="submit">
          <FaUser />
          {buttonTitle}
        </FormButton>
      </div>
    </form>
  );
}

export default UserForm;
