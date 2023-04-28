import { useParams } from "react-router-dom"
import AppointmentForm from "."

const CreateAppointmentForm = () => {
    const { physicianId } = useParams()

    const appointment = {
        physicianId: physicianId || "",
        hospitalId: "",
        reasonForVisit: "",
        startTime: "",
        endTime: "",
    }

    return (
        <AppointmentForm appointment={appointment} formType="Create Appointment" />
    )
}

export default CreateAppointmentForm