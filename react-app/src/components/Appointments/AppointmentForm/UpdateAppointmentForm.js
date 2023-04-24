import { useDispatch, useSelector } from "react-redux"
import AppointmentForm from "."
import { useParams } from "react-router-dom";



const UpdateAppointmentForm = () => {
    const dispatch = useDispatch();
    const { appointmentId } = useParams()

    const appointmentsState = useSelector(state => state.appointments)
    const appointmentData = appointmentsState[appointmentId]
    console.log(appointmentData.start_time)
    const appointment = {
        id: appointmentData.id,
        physicianId: appointmentData.physician_id,
        hospitalId: appointmentData.hospital_id,
        reasonForVisit: appointmentData.reason_for_visit,
        startTime: appointmentData.start_time,
        endTime: appointmentData.end_time
    }

    return (
        <AppointmentForm appointment={appointment} formType="Update Appointment" />
    )
}

export default UpdateAppointmentForm