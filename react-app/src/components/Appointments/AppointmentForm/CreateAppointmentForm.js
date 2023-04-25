import { useParams } from "react-router-dom"
import AppointmentForm from "."

const CreateAppointmentForm = () => {
    const { physicianId } = useParams()

    console.log("ID", physicianId)

    const appointment = {
        physicianId: physicianId || 0,
        hospitalId: 0,
        reasonForVisit: "",
        startTime: "",
        endTime: "",
    }

    return (
        <AppointmentForm appointment={appointment} formType="Create Appointment" />
    )
}

export default CreateAppointmentForm