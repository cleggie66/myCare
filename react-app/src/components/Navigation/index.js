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
			<div className='navbar-links'>
				<NavLink exact to="/hospitals" className="navlink">
					Hospitals
				</NavLink>
				<NavLink exact to="/specialties" className="navlink">
					Specialties
				</NavLink>
			</div>
			{isLoaded && (
				<ProfileButton user={sessionUser} />
			)}
		</div>
	);
}

export default Navigation;