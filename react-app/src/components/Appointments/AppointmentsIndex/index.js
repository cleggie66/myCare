import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { setAppointmentsThunk } from "../../../store/appointments"
import "./AppointmentsIndex.css"
import OpenModalButton from "../../OpenModalButton"
import DeleteAppointmentModal from "../DeleteAppointmentModal"


const AppointmentsIndex = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(setAppointmentsThunk())
    }, [dispatch])

    const appointmentsState = useSelector(state => state.appointments)
    if (!appointmentsState) return <h1>LOADING...</h1>
    const appointments = Object.values(appointmentsState)


    return (
        <>
            <h2>Appointments</h2>
            <div className="appointment-cards-index">
                {appointments.map((appointment) => {
                    return (
                        <div className="appointment-card" key={appointment.id}>
                            <div className="appointment-card-date">
                                <h3>{appointment.start_time}</h3>
                            </div>
                            <h2>{appointment.hospital.name}</h2>
                            <h3>{appointment.hospital.address}</h3>
                            <h2>{`${appointment.physician.first_name} ${appointment.physician.last_name} ${appointment.physician.medical_education}`}</h2>
                            <h3>{appointment.reason_for_visit}</h3>
                            <i class="fa-solid fa-pen-to-square"
                                onClick={() => history.push(`/appointment/${appointment.id}/update`)}
                            />
                            <OpenModalButton
                                buttonText={<i class="fa-solid fa-trash-can"></i>}
                                modalComponent={<DeleteAppointmentModal appointment={appointment} />}
                            />
                        </div>
                    )
                })}
            </div>
            <button
                onClick={() => history.push("/appointment/new")}
            >Add an Appointment</button>
        </>
    )

}

export default AppointmentsIndex