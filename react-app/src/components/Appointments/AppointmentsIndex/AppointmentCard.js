import { useState } from "react"
import { useHistory } from "react-router-dom"
import OpenModalButton from "../../OpenModalButton"
import DeleteAppointmentModal from "../AppointmentModal/DeleteAppointmentModal"
import UpdateAppointmentModal from "../AppointmentModal/UpdateAppointmentModal"


const AppointmentCard = ({ appointment }) => {
    const [iconVisibility, setIconVisibility] = useState("hidden-icons")
    const monthArray = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
    const year = appointment.start_time.slice(0, 4)
    const monthNum = Number(appointment.start_time.slice(5, 7))
    const month = monthArray[monthNum - 1]
    const day = appointment.start_time.slice(8, 10)
    const hour = appointment.start_time.slice(11, 13)
    const minute = appointment.start_time.slice(14)
    const time = `${hour > 12 ? hour - 12 : hour}:${minute} ${hour > 12 ? "PM" : "AM"}`
    
    return (
        <div
            className="appointment-card"
            key={appointment.id}
            onMouseOver={() => setIconVisibility("")}
            onMouseLeave={() => setIconVisibility("hidden-icons")}
        >
            <div className="appointment-card-date">
                <h3 className="month">{month}</h3>
                <h3 className="day">{day}</h3>
                <h3 className="year">{year}</h3>
                <h3 className="time">{time}</h3>
            </div>
            <div className="appointment-card-details">
                <h3>{`${appointment.physician.first_name} ${appointment.physician.last_name} ${appointment.physician.medical_education}`}</h3>
                <hr className="appointment-hr"/>
                <h2>{appointment.hospital.name}</h2>
                <h4>{appointment.hospital.address}</h4>
                <hr className="appointment-hr" />
                <p>{appointment.reason_for_visit}</p>
            </div>
            <div className="appointment-card-icons">
                <OpenModalButton
                    buttonText={<i className="fa-solid fa-pen-to-square" />}
                    modalComponent={<UpdateAppointmentModal appointment={appointment} />}
                    className={`appointment-card-icon ${iconVisibility}`}
                />
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