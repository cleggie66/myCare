import './AboutModal.css'

const AboutModal = ({ spot }) => {


    return (
        <div className='about-modal'>
            <div className='about-modal-top'>
                <div className="about-profile-image-container">
                    <img src="https://drive.google.com/uc?export=view&id=1sBi1cZjzbQKV-4_xHTJf12culI1c-Abz" alt="caleb" />
                </div>
                <p><p className='about-modal-title'>Hey, I'm Caleb!</p> I'm a software engineer that can't get enough of fixing issues. My experience in media and live production helped me grasp the art of problem-solving and brought to life my passion for making things work. As a software engineer, I am able to apply what I have learned and carry on my passion for solving the puzzle.</p>
            </div>
            <ul>
                <li className='about-modal-title'>I love what I do, and a little of what I can do is:</li>
                <li>⚡️ Build frontends using Javascript, React, Redux, HTML, CSS</li>
                <li>⚡️ Develop backends using Python, Javascript, Flask, Express, SQL, PostgreSQL</li>
                <li>⚡️ Make designs come to life with the Adobe suite</li>
                <li>⚡️ Stay cool under pressure</li>
            </ul>
            <div className='about-modal-icons'>
                <a href="https://cleggie66.github.io/" target="_blank" rel="noopener noreferrer">
                    <i className="fa-solid fa-globe"></i>
                </a>
                <a href="https://github.com/cleggie66" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-github" />
                </a>
                <a href="mailto: caleb@cleghorn.org" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-linkedin" />
                </a>
                <a href="mailto: caleb@cleghorn.org" target="_blank" rel="noopener noreferrer">
                    <i className="fa-solid fa-envelope" />
                </a>
            </div>
        </div>
    )
}

export default AboutModal;