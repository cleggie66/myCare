import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteAppointmentThunk } from "../../../store/appointments";

const DeleteAppointmentModal = ({ appointment }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDelete = () => {
        return dispatch(deleteAppointmentThunk(appointment))
            .then(closeModal)
    }

    return (
        <div className="delete-spot-modal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this appointment?</p>
            <button
                onClick={handleDelete}
                // className="confirm-delete-spot-button"
            >
                Yes (Delete Appointment)
            </button>
            <button
                onClick={closeModal}
                // className="cancel-delete-spot"
            >
                No (Keep Appointment)
            </button>
        </div>
    )
};

export default DeleteAppointmentModal