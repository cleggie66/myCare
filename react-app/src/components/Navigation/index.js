import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='navbar'>
			<NavLink exact to="/dashboard">
				<span className='home-icon'>
					<i className="fa-solid fa-house" />
				</span>
			</NavLink>
			{sessionUser && (
				<div className='navbar-links'>
					<NavLink exact to="/physicians" className="navlink">
						Physicians
					</NavLink>
					<NavLink exact to="/hospitals" className="navlink">
						Hospitals
					</NavLink>
					<NavLink exact to="/specialties" className="navlink">
						Specialties
					</NavLink>
					<a
						target="_blank"
						rel="noopener noreferrer"
						className="navlink"
						href="https://cleggie66.github.io/"
					>
						About
					</a>
				</div>
			)}
			{isLoaded && (
				<ProfileButton user={sessionUser} />
			)}
		</div>
	);
}

export default Navigation;