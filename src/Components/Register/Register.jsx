import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { apiPublic } from "../../Service/HttpService";
import { alertErr, alertOkClick } from "../../Utils/UI";
import { isValidEmail, isValidName } from "../../Utils/Validator";
import BaseButton from "../BaseButton/BaseButton";
import "../styles/Form.css";

export default function Register() {

    const defaultsValues = {
        lastName: "",
        firstName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    }

    const navigate = useNavigate();
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
        const maxName = 56;
        const minName = 3;
        const minPwd = 8;

        if (!input.lastName) {
            errors.lastName = 'Lastname is required';
        }
        else if (!isValidName(input.lastName)) {
            errors.lastName = 'Lastname is invalid';
        }
        else if (input.lastName.length < minName) {
            errors.lastName = `Lastname is too short (${input.lastName.length}/${minName})`;
        }
        else if (input.lastName.length > maxName) {
            errors.lastName = `Lastname is too long (${input.lastName.length}/${maxName})`;
        }
        if (!input.firstName) {
            errors.firstName = 'Firstname is required';
        }
        else if (!isValidName(input.firstName)) {
            errors.firstName = 'Firstname is invalid';
        }
        else if (input.firstName.length < minName) {
            errors.firstName = `Firstname is too short (${input.firstName.length}/${minName})`;
        }
        else if (input.firstName.length > maxName) {
            errors.firstName = `Firstname is too long (${input.firstName.length}/${maxName})`;
        }
        if (!input.email) {
            errors.email = 'Email is required';
        }
        else if (!isValidEmail(input.email)) {
            errors.email = `Email is invalid`;
        }
        if (!input.password) {
            errors.password = 'Password is required';
        }
        else if (input.password.length < minPwd) {
            errors.password = `Password is too short (${input.password.length}/${minPwd})`;
        }
        if (!errors.password && input.passwordConfirm !== input.password) {
            errors.passwordConfirm = 'Passwords do not match';
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
            !inputState.firstName ||
            !inputState.lastName ||
            !inputState.email ||
            !inputState.password ||
            !inputState.passwordConfirm ||
            inputError.firstName ||
            inputError.lastName ||
            inputError.email ||
            inputError.password ||
            inputError.passwordConfirm
        )
    }

    async function handleOnSubmit(e) {
        e.preventDefault();
        try {
            const newUser = await apiPublic.post('/users', inputState);
            if (newUser.data.body) {
                setResetStates();
                alertOkClick(() => navigate("/login"), "User created successfully!");
            } else {
                alertErr(newUser.data.message);
            }
        } catch (error) {
            alertErr(JSON.parse(error.request.response).error[0].msg);
        }
    }

    return (
        <div className="flex flex-col w-full h-full mt-10">
            <div className="flex flex-col justify-center items-center">
                <h1 className="title">Register</h1>
                <form className="form" onSubmit={e => e.preventDefault()}>
                    <div className="mb-4">
                        <label className="label">
                            Firstname
                        </label>
                        <input className="inputForm"
                            type="text"
                            placeholder="Firstname"
                            name="firstName"
                            value={inputState.firstName}
                            onChange={(e) => handleSetInput(e)}>
                        </input>
                        <div className="h-5">
                            {inputError.firstName && <p className="inputFormErr">{inputError.firstName}</p>}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="label">
                            Lastname
                        </label>
                        <input className="inputForm"
                            type="text"
                            placeholder="Lastname"
                            name="lastName"
                            value={inputState.lastName}
                            onChange={(e) => handleSetInput(e)}>
                        </input>
                        <div className="h-5">
                            {inputError.lastName && <p className="inputFormErr">{inputError.lastName}</p>}
                        </div>
                    </div>
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
                    <div className="mb-4">
                        <label className="label">
                            Confirm Password
                        </label>
                        <input className="inputForm"
                            placeholder="Confirm Password"
                            type="password"
                            name="passwordConfirm"
                            value={inputState.passwordConfirm}
                            onChange={(e) => handleSetInput(e)}>
                        </input>
                        <div className="h-5">
                            {inputError.passwordConfirm && <p className="inputFormErr">{inputError.passwordConfirm}</p>}
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <BaseButton
                            onClick={(e) => handleOnSubmit(e)}
                            disabled={isButtonDisabled()}
                            type='submit'>
                        </BaseButton>
                        <p className="mt-2 mb-1 flex justify-center">Do you already have an account?</p>
                        <Link to="/login" className="flex justify-center underline">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}