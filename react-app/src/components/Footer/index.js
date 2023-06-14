import OpenModalButton from '../OpenModalButton';
import AboutModal from '../AboutModal';
import resume from "../../media/caleb-cleghorn-resume.pdf"
import './Footer.css';


function Footer({ isLoaded }) {
    return (
        <div className='footer'>
            <p>Copyright © 2023 Caleb Cleghorn</p>
            <p>•</p>
            <p>All rights reserved</p>
            <p>•</p>
            <OpenModalButton
                className={"about-link"}
                buttonText="About"
                modalComponent={<AboutModal/>}
            />
            <p>•</p>
            <div className='footer-icons'>
                <a href="https://cleggie66.github.io/" target="_blank" rel="noopener noreferrer">
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
                <a href={resume} target="_blank" rel="noopener noreferrer">
                    <i className="fa-solid fa-file" />
                </a>
            </div>
        </div>
    );
}

export default Footer;