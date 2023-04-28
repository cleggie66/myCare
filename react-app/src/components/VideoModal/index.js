import "./VideoModal.css"
import { useModal } from "../../context/Modal";

const VideoModal = ({ videoURL }) => {
    const { closeModal } = useModal();

    return (
        <>
            <i
                className="fa-solid fa-x close-player-icon"
                onClick={closeModal}
            ></i>
            <iframe
                title="test"
                className="video-player"
                id="fancybox__iframe_2_0"
                allow="autoplay; fullscreen"
                scrolling="auto"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?wmode=transparent&amp;rel=0&amp;autoplay=1&amp;autohide=1&amp;fs=1&amp;hd=1&amp;enablejsapi=1&amp;html5=1"
                tabindex="0">
            </iframe>
        </>
    );
}

export default VideoModal