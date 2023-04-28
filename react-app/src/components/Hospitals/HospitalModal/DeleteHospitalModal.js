import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteHospitalThunk } from "../../../store/hospitals";

const DeleteHospitalModal = ({ hospital }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDelete = () => {
        return dispatch(deleteHospitalThunk(hospital))
            .then(closeModal)
    }

    return (
        <div className="delete-modal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this hospital?</p>
            <button
                onClick={handleDelete}
                className="confirm-delete-button"
            >
                Yes (Delete Hospital)
            </button>
            <button
                onClick={closeModal}
                className="cancel-delete-button"
            >
                No (Keep Hospital)
            </button>
        </div>
    )
};

export default DeleteHospitalModal