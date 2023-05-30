import AppointmentForm from "."

const CreateAppointmentModal = ({ physician }) => {

    const appointment = {
        physician: physician || {},
        hospitalId: physician?.hospital.id || "",
        reasonForVisit: "",
        startTime: "",
        endTime: "",
    }

    return (
        <AppointmentForm appointment={appointment} formType="Book" />
    )
}

export default CreateAppointmentModal