import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalButton from '../OpenModalButton';
import AboutModal from '../AboutModal';

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
					<OpenModalButton
						className={"about-nav-link"}
						buttonText="About"
						modalComponent={<AboutModal />}
					/>
				</div>
			)}
			{isLoaded && (
				<ProfileButton user={sessionUser} />
			)}
		</div>
	);
}

export default Navigation;