import { useFormik } from 'formik';
import { FaUser } from 'react-icons/fa';
import { FormLabel, FormInput, ErrorMessage } from '../FormComponents';
import { useDispatch, useSelector } from 'react-redux';
import { alertAdvert, alertAdvert2, alertErr, alertOk } from '../../../../Utils/UI';
import { getUserInfo, updateUserInfo } from '../../../../redux/actions/authActions';
import BaseButton from '../../../BaseButton/BaseButton';

export default function EditProfile({ validationSchema, closeModal }) {

  const dispatch = useDispatch();
  const { id, firstName, lastName } = useSelector(user => user.auth.userData);

  const formik = useFormik({
    initialValues: {
      firstName,
      lastName
    },
    validationSchema,
    onSubmit: async () => {
      try {
        const formData = formik.values;

        if ((formData.firstName === firstName) &&
          (formData.lastName === lastName)) {
          closeModal();
          return alertAdvert2("", "No se aplicaron cambios!");
        }

        const filteredData = {
          firstName: formData.firstName,
          lastName: formData.lastName
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

  function isButtonDisabled() {
    return (
      !formik.values.firstName ||
      !formik.values.lastName ||
      formik.errors.firstName ||
      formik.errors.lastName
    );
  }

  return (
    <form className="w-full" onSubmit={(e) => e.preventDefault()} encType="multipart/form-data">
      <div className="flex justify-between">
        <h1 className="flex items-center gap-2 uppercase tracking-wide text-md xs:text-lg font-semibold text-gray-700 pr-9">
          <FaUser />Editar Perfil
        </h1>
      </div>
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
      <BaseButton disabled={isButtonDisabled()} className="w-full mb-4" text="Actualizar Perfil" onClick={formik.handleSubmit} />
    </form>
  );
}
