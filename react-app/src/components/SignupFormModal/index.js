import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [bloodType, setBloodType] = useState("");
	const [profilePicture, setProfilePicture] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

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
		if (password === confirmPassword) {
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
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label>
					First Name
				</label>
				<input
					type="text"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
				/>
				<label>
					Last Name
				</label>
				<input
					type="text"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
				/>
				<label>
					Username
				</label>
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<label>
					Email
				</label>
				<input
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label>
					Date of Birth
				</label>
				<input
					type="date"
					value={dateOfBirth}
					onChange={(e) => setDateOfBirth(e.target.value)}
				/>
				<label>
					Blood Type
				</label>
				<input
					type="text"
					value={bloodType}
					onChange={(e) => setBloodType(e.target.value)}
				/>
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
				<label>
					Confirm Password
				</label>
				<input
					type="password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				<button type="submit">Sign Up</button>
				<button onClick={autoFill} type="button">Auto Fill</button>
			</form>
		</>
	);
}

export default SignupFormModal;