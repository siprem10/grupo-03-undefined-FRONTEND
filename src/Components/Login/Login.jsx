import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { alert } from "../../Utils/UI";
import { isValidEmail } from "../../Utils/Validator";
import BaseButton from "../BaseButton/BaseButton";
import "./Login.css";

export default function Login() {

    const defaultsValues = {
        email: "",
        password: "",
    }

    const navigate = useNavigate();
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

    function setResetStates() {
        setInputState({ ...defaultsValues });
        setInputError({ ...defaultsValues });
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
        );
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        setResetStates();

        /*Logea*/if (true) {
            navigate("/");
        } else {
            alert("Oops...", "Invalid credentials!", "error");
        }
    }

    return (
        <div>
            <h1 className="title">Login</h1>

            <form className="form" onSubmit={e => e.preventDefault()}>

                <div className="mb-4">
                    <label className="label">
                        Email
                    </label>
                    <input className="inputForm"
                        type="text"
                        placeholder="Email"
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
                        Password
                    </label>
                    <input className="inputForm"
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={inputState.password}
                        onChange={(e) => handleSetInput(e)}>
                    </input>
                    <div className="h-5">
                        {inputError.password && <p className="inputFormErr">{inputError.password}</p>}
                    </div>
                </div>

                <div className="flex flex-col w-full h-full">
                    <BaseButton
                        onClick={(e) => handleOnSubmit(e)}
                        disabled={isButtonDisabled()}
                        type='submit'>
                    </BaseButton>
                    <p className="mt-2 mb-1 flex justify-center">Don't have an account?</p>
                    <Link to="/register" className="flex justify-center underline">Register</Link>
                </div>
            </form>
        </div>
    )
}