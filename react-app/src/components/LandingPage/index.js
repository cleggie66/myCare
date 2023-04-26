import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import "./LandingPage.css"


const LandingPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    // Directs user to dashboard if already logged in ▼
    if (sessionUser) return <Redirect to="/dashboard" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
            setErrors(data);
        }
    };

    const loginDemo = async (e) => {
        e.preventDefault();
        await dispatch(login("demo@aa.io", "password"));
    }


    return (
        <div className="welcome-page">
            <div className="landing-left-section">
                <h2>Logo</h2>
                <div className="info-cards-group">
                    <div className="info-card">
                        <div className="info-card-icon">
                            <i class="fa-solid fa-user-doctor"></i>
                        </div>
                        <div className="info-card-details">
                            <h4>Find physicians suited for you</h4>
                            <p>Details</p>
                        </div>
                    </div>
                    <div className="info-card">
                        <div className="info-card-icon">
                            <i class="fa-regular fa-calendar-days"></i>
                        </div>
                        <div className="info-card-details">
                            <h4>Book appointments</h4>
                            <p>Details</p>
                        </div>
                    </div>
                    <div className="info-card">
                        <div className="info-card-icon">
                            <i class="fa-solid fa-pills"></i>
                        </div>
                        <div className="info-card-details">
                            <h4>Research medical specialities</h4>
                            <p>Details</p>
                        </div>
                    </div>
                    <div className="info-card">
                        <div className="info-card-icon">
                            <i class="fa-solid fa-hospital"></i>
                        </div>
                        <div className="info-card-details">
                            <h4>Locate hospitals</h4>
                            <p>Details</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="landing-right-section">
                <h2>Welcome Back</h2>
                <form onSubmit={handleSubmit} className="landing-login-form">
                    <ul>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                    <label>
                        Email
                    </label>
                    <input
                        className="landing-input"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label>
                        Password
                    </label>
                    <input
                        className="landing-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="landing-button"
                    >Log In</button>
                    <button
                        type="button"
                        className="landing-button"
                        onClick={loginDemo}
                    >Demo User</button>
                </form>
                <h2>New Here?</h2>
                <OpenModalButton
                    modalComponent={<SignupFormModal />}
                    buttonText="Sign Up"
                    className="landing-button"
                />
            </div>
        </div>
    )
}


export default LandingPage