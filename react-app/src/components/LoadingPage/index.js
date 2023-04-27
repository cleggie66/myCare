import loadingGif from '../../media/myCare-Loading-Screen.gif'
import "./LoadingPage.css"


const LoadingPage = ({ visibility }) => {

    return (
        <div className={`loading-page ${visibility}`}>
            <img src={loadingGif} alt="loading..." className='loading-gif' />
        </div>
    )
}

export default LoadingPage
