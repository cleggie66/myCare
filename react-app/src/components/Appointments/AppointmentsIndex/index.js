import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { setAppointmentsThunk } from "../../../store/appointments"
import "./AppointmentsIndex.css"
import AppointmentCard from "./AppointmentCard"
import CreateAppointmentModal from "../AppointmentModal/CreateAppointmentModal"
import OpenModalButton from "../../OpenModalButton"


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
            <h2 className="appointments-title">Appointments</h2>
            <div className="appointment-cards-index">
                {appointments.map((appointment) => {
                    return <AppointmentCard appointment={appointment}/>
                })}
            </div>
            <OpenModalButton
                buttonText="Book an Appointment"
                modalComponent={<CreateAppointmentModal />}
                className="book-appointment-button"
            />
        </>
    )

}

export default AppointmentsIndex