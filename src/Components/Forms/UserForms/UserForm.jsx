import React, { useState } from 'react';
import { useFormik } from 'formik';
import { FaUser } from 'react-icons/fa';
import { FormLabel, FormInput, ErrorMessage, PreviewImage } from './FormComponents';
import { useDispatch, useSelector } from 'react-redux';
import { alertErr, alertOk, alertOkClick } from '../../../Utils/UI';
import { getUserInfo, updateUserInfo, updateUserPwdInfo } from '../../../redux/actions/authActions';
import BaseButton from '../../BaseButton/BaseButton';

function UserForm({
  title,
  validationSchema,
  modify = false,
  closeModalWithoutConfirmation
}) {
  const dispatch = useDispatch();
  const { id, firstName, lastName, avatar } = useSelector(user => user.auth.userData);
  const [hidePasswordFields, setHidePasswordFields] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName,
      lastName,
      image: avatar,
      currentPassword: '',
      newPassword: '',
      repeatPassword: ''
    },
    validationSchema,
    onSubmit: async (userData) => {
      try {
        const { firstName, lastName, image } = userData;

        if (!firstName || !lastName) {
          return alertErr('Complete todos los campos!');
        }

        const filteredData = {
          firstName,
          lastName,
          image,
        };

        await updateUserInfo(id, filteredData);
        dispatch(getUserInfo());

        alertOkClick(
          closeModalWithoutConfirmation,
          'Se ha modificado el perfil correctamente',
          'Actualizado!'
        );
      } catch (error) {
        alertErr(error.response.data.error);
      }
    },
  })

  async function handlePwdUser() {
    try {
      const { currentPassword, newPassword, repeatPassword } = formik.initialValues;

      if ((currentPassword && !newPassword) || (currentPassword && !repeatPassword)) {
        return alertErr('Si desea cambiar la contraseña debe proporcionar una nueva');
      }

      if (!currentPassword && newPassword && repeatPassword) {
        return alertErr('Debe introducir su actual contraseña para poder cambiarla');
      }

      const updated = await updateUserPwdInfo(id, {
        password: currentPassword,
        newPassword
      });

      alertOk(updated.data.message);

    } catch (error) {
      alertErr(error);
    }
  }

  return (
    <form className="w-full" onSubmit={(e) => e.preventDefault()} encType="multipart/form-data">
      <div className="flex justify-between">
        <h1 className="flex items-center gap-2 uppercase tracking-wide text-lg font-semibold text-gray-700">
          <FaUser /> {title}
        </h1>
      </div>
      {/* <div>
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
            <FormLabel className="primaryButton hover:opacity-80 text-white rounded-md shadow-md disabled:opacity-75" labelButton={true} htmlFor="image">
              Seleccionar Archivo
            </FormLabel>
            {formik.values.image && formik.errors.image && (
              <ErrorMessage msg={formik.errors.image} />
            )}
          </div>
        </div>
      </div> */}
      <div className="flex flex flex-row justify-center items-center mt-4 gap-2">
        <div className="w-[100%]">
          <FormLabel htmlFor="firstName">Nombre</FormLabel>
          <FormInput
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.firstName}
            formikError={formik.errors.firstName}
            placeholder="Nombre"
          />
          <div className='h-6 flex justify-start'>
            {formik.errors.firstName && (
              <ErrorMessage msg={formik.errors.firstName} />
            )}
          </div>
        </div>
        <div className="w-[100%]">
          <FormLabel htmlFor="lastName">Apellido</FormLabel>
          <FormInput
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.lastName}
            formikError={formik.errors.lastName}
            placeholder="Apellido"
          />
          <div className='h-6 flex justify-start'>
            {formik.errors.lastName && (
              <ErrorMessage msg={formik.errors.lastName} />
            )}
          </div>
        </div>
      </div>
      <BaseButton onClick={formik.handleSubmit} className="w-full mb-4" text="Actualizar Datos Usuario" />

      <div>
        <div className="w-full mt-1 gap-2">
          {modify && (
            <div className={`flex flex-wrap ${hidePasswordFields === true && 'hidden'}`}>
              <div className="flex justify-between mb-4">
                <h1 className="flex items-center gap-2 uppercase tracking-wide text-lg font-semibold text-gray-700">
                  <FaUser /> Cambiar Contraseña
                </h1>
              </div>
              <div className="w-full">
                <FormLabel htmlFor="currentPassword">Contraseña Actual:</FormLabel>
                <FormInput
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.currentPassword}
                  placeholder="***********"
                />
                <div className='h-6 flex justify-start'>
                  {formik.errors.currentPassword && (
                    <ErrorMessage msg={formik.errors.currentPassword} />
                  )}
                </div>
              </div>
            </div>
          )}
          <div className={`flex flex-wrap ${hidePasswordFields === true && 'hidden'}`}>
            <div className="w-full">
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
              <div className='h-6 flex justify-start'>
                {formik.errors.newPassword && (
                  <ErrorMessage msg={formik.errors.newPassword} />
                )}
              </div>
            </div>
          </div>
          <div className={`flex flex-wrap ${hidePasswordFields === true && 'hidden'}`}>
            <div className="w-full">
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

              <div className='h-6 flex justify-start'>
                {formik.errors.repeatPassword && (
                  <ErrorMessage msg={formik.errors.repeatPassword} />
                )}
              </div>
            </div>
          </div>
          {/* <BaseButton className="w-full my-2" text={"Cambiar pwdsadas"} onClick={() => setHidePasswordFields(!hidePasswordFields)} /> */}
          <BaseButton className="w-full my-2" text={"Cambiar Pwd"} onClick={handlePwdUser} />

        </div>
      </div>

    </form>
  );
}

export default UserForm;
