import { useDispatch, useSelector } from "react-redux"
import AppointmentForm from "."
import { useParams } from "react-router-dom";



const UpdateAppointmentForm = () => {
    const dispatch = useDispatch();
    const { appointmentId } = useParams()

    const appointmentsState = useSelector(state => state.appointments)
    const appointment = {
        physicianId: 0,
        hospitalId: 0,
        reasonForVisit: "",
        startTime: "2019-05-15 17:08:11",
        endTime: "2019-05-15 17:08:11",
    }

    return (
        <AppointmentForm appointment={appointment} formType="Update Appointment" />
    )
}

export default UpdateAppointmentForm