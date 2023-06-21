import { useHistory } from "react-router-dom";
import OpenModalButton from "../../OpenModalButton";
import DeleteSpecialtyModal from "./DeleteSpecialtyModal";
import UpdateSpecialtyModal from "./UpdateSpecialtyModal";

const ShowSpecialtyModal = ({ specialty }) => {
    const history = useHistory()

    return (
        <div className="specialty-modal">
            <h2 className="show-specialty-title">{specialty.name}</h2>
            <h4 className="show-specialty-description">{specialty.description}</h4>
            {/* <button
                onClick={() => {
                    history.push('/')
                }}
            >Find Physicians</button> */}
            <div className="specialty-buttons">
                <OpenModalButton
                    buttonText={<i className="fa-solid fa-pen-to-square"></i>}
                    modalComponent={<UpdateSpecialtyModal specialty={specialty} />}
                    className="specialty-card-icon"
                />
                <OpenModalButton
                    buttonText={<i className="fa-solid fa-trash-can"></i>}
                    modalComponent={<DeleteSpecialtyModal specialty={specialty} />}
                    className="specialty-card-icon"
                />
            </div>
        </div>
    );
}

export default ShowSpecialtyModal