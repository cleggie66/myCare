import { useState } from "react"
import { useHistory } from "react-router-dom"
import OpenModalButton from "../../OpenModalButton"
import DeleteAppointmentModal from "../DeleteAppointmentModal"


const AppointmentCard = ({ appointment }) => {
    const history = useHistory()
    const [iconVisibility, setIconVisibility] = useState("hidden-icons")

    return (
        <div
            className="appointment-card"
            key={appointment.id}
            onMouseOver={() => setIconVisibility("")}
            onMouseLeave={() => setIconVisibility("hidden-icons")}
        >
            <div className="appointment-card-content">
                <div className="appointment-card-date">
                    <h3>{appointment.start_time}</h3>
                </div>
                <h2>{appointment.hospital.name}</h2>
                <h3>{appointment.hospital.address}</h3>
                <h2>{`${appointment.physician.first_name} ${appointment.physician.last_name} ${appointment.physician.medical_education}`}</h2>
                <h3>{appointment.reason_for_visit}</h3>
            </div>
            <div className="appointment-card-icons">
                <div className={`appointment-card-icon ${iconVisibility}`}>
                    <i className="fa-solid fa-pen-to-square"
                        onClick={() => history.push(`/appointment/${appointment.id}/update`)}
                    />
                </div>
                <OpenModalButton
                    buttonText={<i className="fa-solid fa-trash-can"></i>}
                    modalComponent={<DeleteAppointmentModal appointment={appointment} />}
                    className={`appointment-card-icon ${iconVisibility}`}
                />
            </div>
        </div>
    )

}

export default AppointmentCard