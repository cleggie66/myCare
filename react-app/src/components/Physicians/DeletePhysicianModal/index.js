import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deletePhysicianThunk } from "../../../store/physicians";

const DeletePhysicianModal = ({ physician }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDelete = () => {
        return dispatch(deletePhysicianThunk(physician))
            .then(closeModal)
    }

    return (
        <div className="delete-modal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this physician?</p>
            <button
                onClick={handleDelete}
                className="confirm-delete-button"
            >
                Yes (Delete Physician)
            </button>
            <button
                onClick={closeModal}
                className="cancel-delete-button"
            >
                No (Keep Physician)
            </button>
        </div>
    )
};

export default DeletePhysicianModal