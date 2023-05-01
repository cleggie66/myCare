import "./VideoModal.css"
import { useModal } from "../../context/Modal";

const VideoModal = ({ video }) => {
    const { closeModal } = useModal();

    const urlParser = (videoURL) => {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        const match = videoURL.match(regExp);
        if (match && match[7].length === 11) {
            return match[7];
        } else {
            return "dQw4w9WgXcQ"
        }
    }

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
                src={`https://www.youtube.com/embed/${urlParser(video)}?wmode=transparent&amp;rel=0&amp;autoplay=1&amp;autohide=1&amp;fs=1&amp;hd=1&amp;enablejsapi=1&amp;html5=1`}
                tabindex="0">
            </iframe>
        </>
    );
}

export default VideoModal