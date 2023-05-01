import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const { closeModal } = useModal();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [bloodType, setBloodType] = useState("");
	const [profilePicture, setProfilePicture] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [backendErrors, setBackendErrors] = useState([]);
	const [errors, setErrors] = useState([]);
	const [hasSubmitted, setHasSubmitted] = useState(false)

	const options = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]

	useEffect(() => {
		const errorsObj = {};
		if (firstName.trim().length === 0) {
			errorsObj.first_name = "First name required";
		};
		if (firstName.length > 50) {
			errorsObj.first_name = "50 character limit";
		};
		if (lastName.trim().length === 0) {
			errorsObj.last_name = "Last name required";
		};
		if (lastName.length > 50) {
			errorsObj.last_name = "50 character limit";
		};
		if (username.trim().length === 0) {
			errorsObj.username = "Username required";
		};
		if (username.length > 50) {
			errorsObj.username = "50 character limit";
		};
		if (email.trim().length === 0) {
			errorsObj.email = "Email required";
		};
		if (email.length > 255) {
			errorsObj.email = "255 character limit";
		};
		if (dateOfBirth === "") {
			errorsObj.DOB = "Date of Birth required";
		};
		if (password === "") {
			errorsObj.password = "Password required";
		};
		if (password !== confirmPassword) {
			errorsObj.confirmPassword = "Passwords must match";
		};
		setErrors(errorsObj);
	}, [firstName, lastName, username, email, dateOfBirth, password, confirmPassword]);

	const autoFill = () => {
		setFirstName("John");
		setLastName("Doe");
		setUsername(String(Math.floor(Math.random() * 10000000)));
		setEmail(`${String(Math.floor(Math.random() * 10000000))}@aa.io`);
		setDateOfBirth("1999-06-16");
		setBloodType("AB+");
		setProfilePicture("https://i.kym-cdn.com/entries/icons/mobile/000/016/546/hidethepainharold.jpg");
		setPassword("password");
		setConfirmPassword("password");
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (Object.values(errors).length === 0) {
			const data = await dispatch(signUp({
				first_name: firstName,
				last_name: lastName,
				username,
				email,
				DOB: dateOfBirth,
				blood_type: bloodType,
				profile_picture: profilePicture,
				password: password
			}));
			if (data) {
				setBackendErrors(data);
			} else {
				closeModal();
			}
		}
		setHasSubmitted(true)
	};

	return (
		<div className="signup-modal">
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit} className="signup-form">
				<label>
					First Name
				</label>
				<input
					type="text"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
				/>
				{hasSubmitted && (<p className="error">{errors.first_name}</p>)}
				<label>
					Last Name
				</label>
				<input
					type="text"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
				/>
				{hasSubmitted && (<p className="error">{errors.last_name}</p>)}
				<label>
					Username
				</label>
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				{hasSubmitted && (<p className="error">{errors.username}</p>)}
				{hasSubmitted && (<p className="error">{backendErrors.username}</p>)}
				<label>
					Email
				</label>
				<input
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				{hasSubmitted && (<p className="error">{errors.email}</p>)}
				{hasSubmitted && (<p className="error">{backendErrors.email}</p>)}
				<label>
					Date of Birth
				</label>
				<input
					type="date"
					value={dateOfBirth}
					onChange={(e) => setDateOfBirth(e.target.value)}
				/>
				{hasSubmitted && (<p className="error">{errors.DOB}</p>)}
				<label>
					Blood Type
				</label>
				<select
					value={bloodType}
					onChange={e => setBloodType(e.target.value)}>
					{options.map((value) => (
						<option value={value} key={value}>
							{value}
						</option>
					))}
					<option value="">Select an Option</option>
				</select>
				<label>
					Profile Picture URL
				</label>
				<input
					type="text"
					value={profilePicture}
					onChange={(e) => setProfilePicture(e.target.value)}
				/>
				<label>
					Password
				</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				{hasSubmitted && (<p className="error">{errors.password}</p>)}
				<label>
					Confirm Password
				</label>
				<input
					type="password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				{hasSubmitted && (<p className="error">{errors.confirmPassword}</p>)}
				<div className="signup-form-buttons">
					<button
						type="submit"
						disabled={hasSubmitted && Object.values(errors).length !== 0}
					>Sign Up</button>
					<button
					onClick={autoFill}
					type="button"
					>Auto Fill</button>
				</div>
			</form>
		</div>
	);
}

export default SignupFormModal;