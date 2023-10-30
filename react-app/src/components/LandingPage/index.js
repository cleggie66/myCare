import React, { useEffect, useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import logoGifPurple from "../../media/myCare-Logo-Purple.gif"
import "./LandingPage.css"


const LandingPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [backendErrors, setBackendErrors] = useState([]);
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false)

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

    // Directs user to dashboard if already logged in ▼
    if (sessionUser) return <Redirect to="/dashboard" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(errors).length === 0) {
            const data = await dispatch(login(email, password));
            if (data) {
                setBackendErrors(data);
            }
        }
        setHasSubmitted(true)
    };

    const loginDemo = async (e) => {
        e.preventDefault();
        await dispatch(login("demo@aa.io", "password"));
    }

    return (
        <div className="welcome-page">
            <div className="landing-section">
                <div className="landing-left-section">
                    <img src={logoGifPurple} alt="logo" className='logo-gif' />
                    <div className="info-cards-group">
                        <div className="info-card">
                            <div className="info-card-icon">
                                <i className="fa-solid fa-user-doctor"></i>
                            </div>
                            <div className="info-card-details">
                                <h4>Find physicians suited for you</h4>
                                <p>Browse a doctor that fits your needs. Or even add your own!</p>
                            </div>
                        </div>
                        <div className="info-card">
                            <div className="info-card-icon">
                                <i className="fa-regular fa-calendar-days"></i>
                            </div>
                            <div className="info-card-details">
                                <h4>Book appointments</h4>
                                <p>Schedule your next appointment, or view details of your past and upcoming appointments</p>
                            </div>
                        </div>
                        <div className="info-card">
                            <div className="info-card-icon">
                                <i className="fa-solid fa-pills"></i>
                            </div>
                            <div className="info-card-details">
                                <h4>Research medical specialties</h4>
                                <p>Discover and learn about common practices that our doctors are experts in</p>
                            </div>
                        </div>
                        <div className="info-card">
                            <div className="info-card-icon">
                                <i className="fa-solid fa-hospital"></i>
                            </div>
                            <div className="info-card-details">
                                <h4>Locate hospitals</h4>
                                <p>Find nearby hospitals and get directions</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="landing-right-section">
                    <h2>Welcome Back</h2>
                    <form onSubmit={handleSubmit} className="landing-login-form" id="login-form">
                        <label>
                            Email
                        </label>
                        <input
                            className="landing-input"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {hasSubmitted && (<p className="error">{errors.email}</p>)}
                        <label>
                            Password
                        </label>
                        <input
                            className="landing-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {hasSubmitted && (<p className="error">{errors.password}</p>)}
                        {hasSubmitted && (<p className="error">{backendErrors.password}</p>)}
                    </form>
                    <button
                        type="submit"
                        className="landing-button"
                        form="login-form"
                        disabled={hasSubmitted && Object.values(errors).length !== 0}
                    >Log In</button>
                    <button
                        type="button"
                        className="landing-button"
                        onClick={loginDemo}
                    >Demo User</button>
                    <h2>New Here?</h2>
                    <OpenModalButton
                        modalComponent={<SignupFormModal />}
                        buttonText="Sign Up"
                        className="landing-button"
                    />
                </div>
            </div>
        </div>
    )
}


export default LandingPage