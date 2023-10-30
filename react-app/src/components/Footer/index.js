import OpenModalButton from '../OpenModalButton';
import AboutModal from '../AboutModal';
import './Footer.css';


function Footer({ isLoaded }) {
    return (
        <>
            <div className='footer'>
                <p>Copyright © 2023 Caleb Cleghorn</p>
                <p>•</p>
                <p>All rights reserved</p>
                <p>•</p>
                <OpenModalButton
                    className={"about-link"}
                    buttonText="About"
                    modalComponent={<AboutModal />}
                />
                <p>•</p>
                <div className='footer-icons'>
                    <a href="https://caleb-cleghorn.onrender.com/" target="_blank" rel="noopener noreferrer">
                        <i className="fa-solid fa-globe"></i>
                    </a>
                    <a href="https://github.com/cleggie66" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-github" />
                    </a>
                    <a href="https://www.linkedin.com/in/caleb-cleghorn-31843b189/" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-linkedin" />
                    </a>
                    <a href="mailto: caleb@cleghorn.org" target="_blank" rel="noopener noreferrer">
                        <i className="fa-solid fa-envelope" />
                    </a>
                    <a href="https://drive.google.com/file/d/1Q1Iqbwz_Q2xbUBHG_nfkTLyb-bDS0tYe/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                        <i className="fa-solid fa-file" />
                    </a>
                </div>
            </div>
            <div className='footer-mobile'>
                <p>Copyright © 2023 Caleb Cleghorn</p>
                <div className='footer-icons'>
                    <a href="https://caleb-cleghorn.onrender.com/" target="_blank" rel="noopener noreferrer">
                        <i className="fa-solid fa-globe"></i>
                    </a>
                    <a href="https://github.com/cleggie66" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-github" />
                    </a>
                    <a href="https://www.linkedin.com/in/caleb-cleghorn-31843b189/" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-linkedin" />
                    </a>
                    <a href="mailto: caleb@cleghorn.org" target="_blank" rel="noopener noreferrer">
                        <i className="fa-solid fa-envelope" />
                    </a>
                    <a href="https://drive.google.com/file/d/1Q1Iqbwz_Q2xbUBHG_nfkTLyb-bDS0tYe/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                        <i className="fa-solid fa-file" />
                    </a>
                </div>
            </div>
        </>
    );
}

export default Footer;