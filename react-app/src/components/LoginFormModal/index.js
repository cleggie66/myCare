import React, { useEffect, useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginFormModal.css";

function LoginFormModal() {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [backendErrors, setBackendErrors] = useState([]);
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(errors).length === 0) {
            const data = await dispatch(login(email, password));
            if (data) {
                setBackendErrors(data);
            } else {
                closeModal()
            }
        }
        setHasSubmitted(true)
    };

    useEffect(() => {
        const errorsObj = {};
        if (email.length === 0) {
            errorsObj.email = "Email required";
        };
        if (password.length === 0) {
            errorsObj.password = "Password required";
        };
        setErrors(errorsObj);
    }, [email, password]);


    return (
        <div className="login-modal">
            <h1>Log In</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <label>
                    Email
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                {hasSubmitted && (<p className="error">{errors.email}</p>)}
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                {hasSubmitted && (<p className="error">{errors.password}</p>)}
                {hasSubmitted && (<p className="error">{backendErrors.password}</p>)}
                <button
                type="submit"
                className="login-form-button"
                disabled={hasSubmitted && Object.values(errors).length !== 0}
                >Log In</button>
            </form>
        </div>
    );
}

export default LoginFormModal;