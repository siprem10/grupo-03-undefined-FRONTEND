import { useFormik } from 'formik';
import { FaUser } from 'react-icons/fa';
import { FormLabel, FormInput, ErrorMessage, PreviewImage } from '../FormComponents';
import { useDispatch, useSelector } from 'react-redux';
import { alertErr, alertOk } from '../../../../Utils/UI';
import { getUserInfo, updateUserInfo } from '../../../../redux/actions/authActions';
import BaseButton from '../../../BaseButton/BaseButton';

export default function EditProfile({ validationSchema, closeModal }) {
  const dispatch = useDispatch();
  const { id, firstName, lastName, avatar } = useSelector(user => user.auth.userData);

  const formik = useFormik({
    initialValues: {
      firstName,
      lastName,
      image: avatar
    },
    validationSchema,
    onSubmit: async () => {
      try {
        const { firstName, lastName, image } = formik.values;
        if (!firstName || !lastName) {
          return alertErr('Complete todos los campos!');
        }

        const filteredData = {
          firstName,
          lastName,
          image,
        };

        const updated = await updateUserInfo(id, filteredData);
        dispatch(getUserInfo());
        alertOk(updated.message);
        closeModal();
      } catch (error) {
        alertErr(error.response.data.error.message);
      }
    },
  })

  return (
    <form className="w-full" onSubmit={(e) => e.preventDefault()} encType="multipart/form-data">
      <div className="flex justify-between">
        <h1 className="flex items-center gap-2 uppercase tracking-wide text-lg font-semibold text-gray-700">
          <FaUser />Editar usuario
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
      <BaseButton className="w-full mb-4" text="Actualizar Datos Usuario" onClick={formik.handleSubmit} />
    </form>
  );
}
