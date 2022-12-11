import { useEffect } from "react";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserInfo, login } from "../../redux/actions/authActions";
import { alertErr } from "../../Utils/UI";
import { isValidEmail } from "../../Utils/Validator";
import BaseButton from "../BaseButton/BaseButton";
import { setLogout } from "../../redux/slices/authSlice";
import { getToken } from "../../Utils/Auth";
import "../styles/Form.css";

export default function Login() {

    const defaultsValues = {
        email: "",
        password: "",
    }

    const { status, userData, error } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (status === "success" && getToken()) {
            dispatch(getUserInfo());
            Object.keys(userData).length ? navigate("/") : dispatch(setLogout());
        } else if (status === "failed") {
            alertErr(error);
            dispatch(setLogout());
        }
    }, [status, Object.keys(userData).length]);

    const [inputState, setInputState] = useState({ ...defaultsValues });
    const [inputError, setInputError] = useState({ ...defaultsValues });

    function handleSetInput(e) {
        setInputState({
            ...inputState,
            [e.target.name]: e.target.value
        })
        handleSetInputErrs(e.target.name, e.target.value);
    }

    function validateErrs(input) {
        let errors = {};
        if (!input.email) {
            errors.email = 'Email is required';
        }
        else if (!isValidEmail(input.email)) {
            errors.email = `Email is invalid`;
        }
        if (!input.password) {
            errors.password = 'Password is required';
        }
        return errors;
    }

    function handleSetInputErrs(name, value) {
        const objErrors = validateErrs({ ...inputState, [name]: value });
        setInputError(objErrors);
    }

    function isButtonDisabled() {
        return (
            !inputState.email ||
            !inputState.password ||
            inputError.email ||
            inputError.password
        )
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        dispatch(login(inputState));
    }

    return (
        <div className="flex flex-col md:flex-row w-full h-full">
            <section className="basis-1/2 flex px-20 justify-between items-center text-center bg-primary text-white">
                <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-col mb-6 items-center">
                        <h1 className="font-bold text-4xl text-white">Seguir todos tus movimientos nunca fue tan fácil.</h1>
                        <img className="h-60 w-80 object-cover" src="/src/assets/landing-cover.png" alt="aca va una foto copada" />
                    </div>
                    <h3 className="font-medium text-lg text-secondary tracking-wider">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ipsum eligendi repellat similique, quis nisi omnis perspiciatis quia accusamus. Mollitia!</h3>
                    <span className="mt-10 font-bold text-xl text-accent">Alkybank Wallet</span>
                </div>
            </section>
            <section className="basis-1/2 flex flex-col px-20 justify-center items-center mt-10 md:mt-0 bg-white text-black">
                <h2 className="form_title">Inicia sesión</h2>
                <form className="form" onSubmit={e => e.preventDefault()}>
                    <div className="mb-4">
                        <label className="label">
                            Email
                        </label>
                        <input className="inputForm"
                            type="text"
                            placeholder="Ingresa tu email"
                            name="email"
                            value={inputState.email}
                            onChange={(e) => handleSetInput(e)}>
                        </input>
                        <div className="h-5">
                            {inputError.email && <p className="inputFormErr">{inputError.email}</p>}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="label">
                            Contraseña
                        </label>
                        <input className="inputForm"
                            placeholder="Ingresa tu contraseña"
                            type="password"
                            name="password"
                            value={inputState.password}
                            onChange={(e) => handleSetInput(e)}>
                        </input>
                        <div className="h-5">
                            {inputError.password && <p className="inputFormErr">{inputError.password}</p>}
                        </div>
                        <Link to="/forgot-password" className="flex mt-1 font-semibold text-info underline">Olvidaste tu contraseña?</Link>
                    </div>
                    <div className="flex flex-col w-full">
                        <BaseButton className="c"
                            onClick={(e) => handleOnSubmit(e)}
                            disabled={isButtonDisabled()}
                            type='submit'>
                        </BaseButton>
                        <p className="flex mt-4 text-lg justify-center">No tienes una cuenta?</p>
                        <Link to="/register" className="flex justify-center underline font-semibold text-info">Registrate</Link>
                    </div>
                </form>
            </section>
        </div>
    )
}