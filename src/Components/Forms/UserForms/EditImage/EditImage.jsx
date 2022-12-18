import { useFormik } from 'formik';
import { FaUser } from 'react-icons/fa';
import { FormLabel, FormInput, ErrorMessage, PreviewImage } from '../FormComponents';
import { useDispatch, useSelector } from 'react-redux';
import { alertErr, alertOk } from '../../../../Utils/UI';
import { getUserInfo, updateUserImage } from '../../../../redux/actions/authActions';
import BaseButton from '../../../BaseButton/BaseButton';

export default function EditProfile({ validationSchema, closeModal }) {

  const dispatch = useDispatch();
  const { id, avatar } = useSelector(user => user.auth.userData);

  const formik = useFormik({
    initialValues: {
      image: avatar
    },
    validationSchema,
    onSubmit: async () => {
      try {

        const { image } = formik.values;

        const updated = await updateUserImage(id, image);
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
      !formik.values.image ||
      formik.errors.image
    );
  }

  return (
    <form className="w-full" onSubmit={(e) => e.preventDefault()} encType="multipart/form-data">
      <div className="flex justify-between">
        <h1 className="flex items-center gap-2 uppercase tracking-wide text-md xs:text-lg font-semibold text-gray-700 pr-9">
          <FaUser />Cambiar imagen
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
            <FormLabel className="primaryButton hover:opacity-80 text-white rounded-md shadow-md disabled:opacity-75" labelButton={true} htmlFor="image">
              Seleccionar Archivo
            </FormLabel>
            {formik.values.image && formik.errors.image && (
              <ErrorMessage msg={formik.errors.image} />
            )}
          </div>
        </div>
      </div>
      <BaseButton disabled={isButtonDisabled()} className="w-full mb-4" text="Actualizar Datos Usuario" onClick={formik.handleSubmit} />
    </form>
  );
}
