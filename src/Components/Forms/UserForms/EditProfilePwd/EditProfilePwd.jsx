import { useFormik } from 'formik';
import { FaUser } from 'react-icons/fa';
import { FormLabel, FormInput, ErrorMessage } from '../FormComponents';
import { useSelector } from 'react-redux';
import { alertErr, alertOk } from '../../../../Utils/UI';
import { updateUserPwdInfo } from '../../../../redux/actions/authActions';
import BaseButton from '../../../BaseButton/BaseButton';

export default function EditProfilePwd({ validationSchema, closeModal }) {
  const { id } = useSelector(user => user.auth.userData);

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      repeatPassword: ''
    },
    validationSchema,
    onSubmit: async () => {
      try {
        const { currentPassword, newPassword } = formik.values;

        const updated = await updateUserPwdInfo(id, {
          password: currentPassword,
          newPassword
        });

        alertOk(updated.message);
        closeModal();

      } catch (error) {
        const msg = error.response.data.error.message;
        alertErr(msg !== "Bad Request" ? msg : "La contraseña antigua no es correcta!");
      }
    },
  })

  return (
    <form className="w-full" onSubmit={(e) => e.preventDefault()} encType="multipart/form-data">
      <div className="w-full mt-1 gap-2">
        <div className="flex flex-wrap">
          <div className="flex justify-between mb-4">
            <h1 className="flex items-center gap-2 uppercase tracking-wide text-md xs:text-lg font-semibold text-gray-700 pr-9">
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
        <div className="flex flex-wrap">
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
        <div className="flex flex-wrap">
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
        <BaseButton className="w-full my-2" text={"Actualizar Contraseña"} onClick={formik.handleSubmit} />
      </div>
    </form>
  );
}
