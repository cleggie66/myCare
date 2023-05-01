import AppointmentForm from "."

const CreateAppointmentModal = ({ physician }) => {

    const appointment = {
        physicianId: physician.id || "",
        hospitalId: physician.hospital.id || "",
        reasonForVisit: "",
        startTime: "",
        endTime: "",
    }

    return (
        <AppointmentForm appointment={appointment} formType="Create Appointment" />
    )
}

export default CreateAppointmentModal