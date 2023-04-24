import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { setAppointmentsThunk } from "../../../store/appointments"
import "./AppointmentsIndex.css"


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
                            <h2>{`${appointment.patient.first_name} ${appointment.patient.last_name}`}</h2>
                            <h2>{`${appointment.physician.first_name} ${appointment.physician.last_name} ${appointment.physician.medical_education}`}</h2>
                            <button>Edit</button>
                            <button>Delete</button>
                        </div>
                    )
                })}
            </div>
            <button>Add an Appointment</button>
        </>
    )

}

export default AppointmentsIndex