import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteSpecialtyThunk } from "../../../store/specialties";

const DeleteSpecialtyModal = ({ specialty }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDelete = () => {
        return dispatch(deleteSpecialtyThunk(specialty))
            .then(closeModal)
    }

    return (
        <div>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this specialty?</p>
            <button
                onClick={handleDelete}
            // className="confirm-delete-spot-button"
            >
                Yes (Delete Specialty)
            </button>
            <button
                onClick={closeModal}
            // className="cancel-delete-spot"
            >
                No (Keep Specialty)
            </button>
        </div>
    )
};

export default DeleteSpecialtyModal