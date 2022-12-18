import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserInfo, login, logout } from '../../redux/actions/authActions';
import { alertErr } from '../../Utils/UI';
import { isValidEmail } from '../../Utils/Validator';
import BaseButton from '../BaseButton/BaseButton';
import Layout from '../Layout/Layout';
import '../styles/Form.css';

export default function Login() {
  const defaultsValues = {
    email: '',
    password: ''
  };

  const { status, userData, error } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'success' && !Object.keys(userData).length) {
      dispatch(getUserInfo());
    } else if (status === 'failed') {
      alertErr(error);
      dispatch(logout());
    }
  }, [dispatch, status, Object.keys(userData).length]);

  const [inputState, setInputState] = useState({ ...defaultsValues });
  const [inputError, setInputError] = useState({ ...defaultsValues });

  function handleSetInput(e) {
    setInputState({
      ...inputState,
      [e.target.name]: e.target.value
    });

    handleSetInputErrs(e.target.name, e.target.value);
  }

  function validateErrs(input) {
    let errors = {};

    if (!input.email) {
      errors.email = 'Email requerido';
    } else if (!isValidEmail(input.email)) {
      errors.email = `Email inválido`;
    }

    if (!input.password) {
      errors.password = 'Contraseña requerida';
    }

    return errors;
  }

  function handleSetInputErrs(name, value) {
    const objErrors = validateErrs({ ...inputState, [name]: value });
    setInputError(objErrors);
  }

  function isButtonDisabled() {
    return !inputState.email || !inputState.password || inputError.email || inputError.password;
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    dispatch(login(inputState));
  }

  return (
    <Layout>
        <div className="flex flex-col justify-center items-center w-[95%] xs:w-[410px] my-10">
          <h1 className="title">Iniciar sesión</h1>
          <form className="form" onSubmit={e => e.preventDefault()}>
            <div className="mb-4">
              <label className="label">Correo</label>
              <input
                className="inputForm"
                type="text"
                placeholder="usuario@mail.com"
                name="email"
                value={inputState.email}
                onChange={e => handleSetInput(e)}></input>
              <div className="h-5">
                {inputError.email && <p className="inputFormErr">{inputError.email}</p>}
              </div>
            </div>

            <div className="mb-4">
              <label className="label">Contraseña</label>
              <input
                className="inputForm"
                placeholder="************"
                type="password"
                name="password"
                value={inputState.password}
                onChange={e => handleSetInput(e)}></input>
              <div className="h-5">
                {inputError.password && <p className="inputFormErr">{inputError.password}</p>}
              </div>
            </div>

            <div className="flex flex-col w-full">
              <BaseButton
                text="Ingresar"
                onClick={e => handleOnSubmit(e)}
                disabled={isButtonDisabled()}
                type="submit"></BaseButton>
              {/* <Link
                to="/forgot-password"
                className="mt-1 flex justify-center underline text-black dark:text-white">
                ¿Olvidaste la contraseña?
              </Link> */}
              <p className="mt-2 mb-1 flex justify-center text-black dark:text-white">
                ¿Aun no tienes una cuenta?
              </p>
              <Link
                to="/register"
                className="flex justify-center underline text-black dark:text-white">
                Regístrate
              </Link>
            </div>
          </form>
        </div>
    </Layout>
  );
}
