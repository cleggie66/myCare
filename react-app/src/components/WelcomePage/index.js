import "./WelcomePage.css"
import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";


const WelcomePage = () => {
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


    return (
        <div className="welcome-page">
            <div className="welcome-left-section">
                <h2>Logo</h2>
                <div className="info-cards-group">
                    <div className="info-card">
                        <i class="fa-solid fa-user-doctor"></i>
                        <h2>Find physicians suited for you</h2>
                        <p>Details</p>
                    </div>
                    <div className="info-card">
                        <i class="fa-regular fa-calendar"></i>
                        <h2>Book appointments</h2>
                        <p>Details</p>
                    </div>
                    <div className="info-card">
                        <i class="fa-solid fa-pills"></i>
                        <h2>Research medical specialities</h2>
                        <p>Details</p>
                    </div>
                    <div className="info-card">
                        <i class="fa-regular fa-hospital"></i>
                        <h2>Locate hospitals</h2>
                        <p>Details</p>
                    </div>
                </div>
            </div>
            <div className="welcome-right-section">
                <h2>Welcome Back</h2>
                <form onSubmit={handleSubmit}>
                    <ul>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                    <label>
                        Email
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Password
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Log In</button>
                    <button>Demo User</button>
                </form>
                <h2>New Here?</h2>
                <OpenModalButton
                    modalComponent={<SignupFormModal />}
                    buttonText="Sign Up"
                />
            </div>
        </div>
    )
}


export default WelcomePage