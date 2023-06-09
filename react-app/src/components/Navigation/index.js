import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalButton from '../OpenModalButton';
import AboutModal from '../AboutModal';
import logoGif from "../../media/myCare-Icon.gif"

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='navbar'>
			<NavLink exact to="/dashboard" className="home-logo-link">
					<img src={logoGif} alt="logo" className='home-logo-gif' />
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